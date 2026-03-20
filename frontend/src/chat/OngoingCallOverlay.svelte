<script>
  import { onDestroy } from "svelte";
  export let visible = false;
  export let active = false;
  export let ws = null;
  export let agentName = "Agent 1";
  export let elapsedLabel = "0:00";
  export let onClose = () => {};
  export let onEnd = () => {};

  let audioContext;
  let mediaStream;
  let workletNode;
  let analyserNode;
  let animationFrameId;
  export let micVolume = 0;
  let nextPlayTime = 0;
  let wsListenerAdded = false;
  let callStarted = false;

  $: if (active) {
    if (ws && !wsListenerAdded) {
      ws.addEventListener("message", handleWsMessage);
      wsListenerAdded = true;
    }
    startVoiceCall();
    notifyCallStarted();
  } else {
    stopVoiceCall();
  }

  function notifyCallStarted() {
    if (callStarted) return;
    if (ws && ws.readyState === 1) {
      ws.send(JSON.stringify({ type: "start_call" }));
      callStarted = true;
    }
  }

  const handleWsMessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.type === "audio_reply" && audioContext) {
        playAudio(data.data);
      }
    } catch(e) {}
  };

  function playAudio(base64) {
    const binaryString = window.atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const int16Array = new Int16Array(bytes.buffer);
    const float32Array = new Float32Array(int16Array.length);
    for (let i = 0; i < int16Array.length; i++) {
      float32Array[i] = int16Array[i] / 32768.0;
    }

    const audioBuffer = audioContext.createBuffer(1, float32Array.length, 16000);
    audioBuffer.getChannelData(0).set(float32Array);

    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);

    const currentTime = audioContext.currentTime;
    if (nextPlayTime < currentTime) {
      nextPlayTime = currentTime + 0.05;
    }
    source.start(nextPlayTime);
    nextPlayTime += audioBuffer.duration;
  }

  function updateVolume() {
    if (!analyserNode) return;
    const dataArray = new Uint8Array(analyserNode.frequencyBinCount);
    analyserNode.getByteTimeDomainData(dataArray);
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
       const val = (dataArray[i] - 128) / 128;
       sum += val * val;
    }
    const rms = Math.sqrt(sum / dataArray.length);
    // Smooth and scale volume
    micVolume = micVolume * 0.8 + Math.min(1, rms * 5) * 0.2;
    animationFrameId = requestAnimationFrame(updateVolume);
  }

  async function startVoiceCall() {
    if (audioContext) return;

    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContext = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
      nextPlayTime = audioContext.currentTime;

      await audioContext.audioWorklet.addModule("/pcm-processor.js");
      
      const source = audioContext.createMediaStreamSource(mediaStream);
      workletNode = new AudioWorkletNode(audioContext, "pcm-processor");
      
      workletNode.port.onmessage = (event) => {
        if (!active || !ws || ws.readyState !== 1) return;
        const base64 = arrayBufferToBase64(event.data);
        ws.send(JSON.stringify({ type: "audio_chunk", data: base64 }));
      };

      analyserNode = audioContext.createAnalyser();
      analyserNode.fftSize = 256;
      source.connect(analyserNode);
      updateVolume();

      source.connect(workletNode);
    } catch (err) {
      console.error("Microphone access failed:", err);
    }
  }

  function stopVoiceCall() {
    if (ws && ws.readyState === 1 && callStarted) {
      ws.send(JSON.stringify({ type: "end_call" }));
      callStarted = false;
    }
    if (ws && wsListenerAdded) {
      ws.removeEventListener("message", handleWsMessage);
      wsListenerAdded = false;
    }
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
    micVolume = 0;

    if (workletNode) {
      workletNode.disconnect();
      workletNode = null;
    }
    if (mediaStream) {
      mediaStream.getTracks().forEach(t => t.stop());
      mediaStream = null;
    }
    if (audioContext) {
      audioContext.close();
      audioContext = null;
    }
  }

  function arrayBufferToBase64(buffer) {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
       binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  onDestroy(() => stopVoiceCall());
</script>

{#if visible}
  <div class="call-overlay" role="dialog" aria-label="Ongoing call">
    <div class="call-overlay-header">
      <h2>{agentName}</h2>
      <p class="call-overlay-status">ongoing call - {elapsedLabel}</p>
    </div>
    <div class="call-overlay-content">
      <div 
        class="mic-indicator" 
        style="transform: scale({1 + micVolume * 0.8}); opacity: {0.3 + micVolume * 0.7};"
      ></div>
    </div>
    <div class="call-overlay-actions">
      <button type="button" class="call-overlay-action" aria-label="Close overlay" on:click={onClose}>
        <span class="material-symbols-outlined">close</span>
      </button>
      <button type="button" class="call-overlay-action call-overlay-end" aria-label="End call" on:click={onEnd}>
        <span class="material-symbols-outlined">call_end</span>
      </button>
    </div>
  </div>
{/if}

class PCMProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.bufferSize = 2048; // send chunk every 2048 samples (128ms at 16kHz)
    this.buffer = new Int16Array(this.bufferSize);
    this.bufferIndex = 0;
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0];
    if (input.length > 0) {
      const channelData = input[0]; // mono audio
      
      for (let i = 0; i < channelData.length; i++) {
        // Convert float32 to int16
        const sample = Math.max(-1, Math.min(1, channelData[i]));
        this.buffer[this.bufferIndex++] = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
        
        // Once buffer is full, send it to the main thread
        if (this.bufferIndex >= this.bufferSize) {
          // Send a copy of the buffer
          this.port.postMessage(this.buffer.slice().buffer);
          this.bufferIndex = 0;
        }
      }
    }
    return true; // Keep processor alive
  }
}

registerProcessor("pcm-processor", PCMProcessor);

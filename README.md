# Noogler

Noogler is a closed-loop embodied AI agent that operates directly on your computer.

Instead of relying only on APIs, Noogler sees the screen, reasons about what it observes, and takes actions using the mouse and keyboard—just like a human would. It can open software, navigate interfaces, fix errors, and continue working until a task is complete.

If a task could be done by hiring someone to operate a PC, Noogler can do it too.

From vibe coding and software development to creating 3D models in tools like Blender, working inside game engines such as Unity or Unreal Engine, generating art, running programs, or performing complex workflows across multiple applications—Noogler autonomously plans, executes, observes results, and adapts until the goal is achieved.

---

# Overview

**Noogler** is an AI powered coworker that lives inside your computer. It acts as your **eyes, ears, and hands**, observing your desktop through screen capture and interacting with it as a human would.

Instead of just interacting with APIs, **Noogler** operates desktop applications directly through their coordinate-based interfaces, making it capable of handling workflows in browsers, IDEs, Slack, Excel, or any other software.

### The Brain
Powered by **Google Gemini 2.0 (Multimodal & Live API)**, it has the ability to see frames in real-time and maintain a natural, low-latency voice conversation.

---

# Core Capabilities

### 👁️ Real-time Perception
The Intern continuously observes your screen, allowing it to interpret UI layouts, detect application states, and identify visual elements like buttons and text.

### ✋ UI Interaction
It interacts with Windows using:
*   **Mouse Automation**: Clicks, drags, and movement.
*   **Keyboard Input**: Typing, shortcuts, and navigation.
*   **Process Control**: Opening and managing applications.

### 🗣️ Multimodal Dialogue
*   **Text Chat**: Send high-level instructions over a standard chat interface.
*   **Voice Call**: Talk to your intern in real-time. It hears you and replies with a calm, reporting voice.
*   **Shared Context**: Both Chat and Voice share the exact same memory. If you tell it something over text, it will remember it during the voice call.

---

# Architecture

The system consists of three primary components that work in sync:

1.  **Cloud Backend (Node.js)**: The central logic hub. It manages user sessions, brokers messages between the UI and Gemini, and persists conversation history to Firebase.
2.  **Svelte Frontend**: A modern, purple-themed web interface for chat, voice call management, and agent configuration.
3.  **Local Agent (Rust)**: A lightweight, native Windows executable that performs the actual desktop automation and screen capture.

### Data Flow
```mermaid
flowchart TD
    User([User]) <--> Frontend[Svelte Interface]
    Frontend <--> Backend[Node.js Backend]
    Backend <--> Firebase[(Firebase RTDB)]
    Backend <--> Gemini[[Gemini Live API]]
    Backend <--> RustAgent[Rust Local Agent]
    RustAgent <--> Desktop[Windows Desktop]
```

---

# Repository Structure

```text
The-Intern/
├── backend/            # Node.js Server
│   ├── src/
│   │   ├── agent.ts    # Gemini logic & session management
│   │   ├── db.ts       # Firebase Realtime Database integration
│   │   └── server.ts   # WebSocket & REST server
│   └── .env            # API Keys & Config
├── frontend/           # Svelte + Vite App
│   ├── src/            # Chat & Call UI components
│   ├── public/         # Static assets (including intern-local.exe)
│   └── index.html      # Landing & Download page
├── client-rust/        # Native Windows Client
│   └── src/            # Screen capture & Input simulation
└── README.md
```

### Shared Memory (Firebase)
Memory is handled via **Firebase Realtime Database**. The `backend` buffers voice transcripts and text messages, committing them to a synchronized user trajectory. This ensures that every interaction—whether spoken or typed—is part of a single, cohesive memory.

---

# Installation & Setup

### 1. Prerequisites
*   **Node.js 20+**
*   **Rust (for building the client)**
*   **Firebase Project** (with Realtime Database enabled)
*   **Google Gemini API Key**

### 2. Backend Setup
```bash
cd backend
npm install
# Configure your .env with GEMINI_API_KEY and FIREBASE secrets
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 4. Local Agent (Windows)
```bash
cd client-rust
cargo build --release
```
Copy the resulting `intern-local.exe` from `target/release/` to `frontend/public/` to make it available for download.

#### Reduce Defender false positives (zero-cost)
- Build with a consistent release process: run `client-rust/scripts/release-windows.ps1` in PowerShell.
- The client now stores tray icon data in `%LOCALAPPDATA%\InternLocal` instead of `%TEMP%`.
- If Defender flags a build, submit the exact `.exe` to Microsoft:
  `https://www.microsoft.com/wdsi/filesubmission`
- For local development only, add a Defender exclusion on your local build directory.

---

# Tech Stack

*   **Logic**: Node.js (TypeScript)
*   **AI**: Google Gemini 2.0 (Multimodal Live)
*   **Frontend**: SvelteKit, Vite, Vanilla CSS
*   **Automation**: Rust (enigo for input, scrap for capture)
*   **Database**: Firebase Realtime Database
*   **Deployment**: Vercel (Frontend), Node-ready hosting (Backend)

---

# License
MIT License


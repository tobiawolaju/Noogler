use crate::command::CommandItem;
use crate::logger::Logger;
use crate::runner::{now_ms, run_command};
use crate::windows::LocalBody;
use crate::Config;
use serde::{Deserialize, Serialize};
use std::time::Duration;
use tungstenite::{connect, Message};
use url::Url;

#[derive(Debug, Deserialize)]
struct IncomingMessage {
    #[serde(rename = "type")]
    msg_type: Option<String>,
    index: Option<u32>,
    instruction: Option<String>,
    tag: Option<String>,
}

#[derive(Debug, Serialize)]
struct AgentHandshake {
    #[serde(rename = "type")]
    msg_type: String,
    device_id: String,
    user_uid: String,
    user_email: String,
}

#[derive(Debug, Serialize)]
struct ErrorMessage {
    #[serde(rename = "type")]
    msg_type: String,
    error: String,
}

#[derive(Debug, Serialize)]
struct PongMessage {
    #[serde(rename = "type")]
    msg_type: String,
    ts_ms: u128,
}

pub fn connect_and_run(config: Config, local_body: &mut LocalBody, logger: &mut Logger) -> Result<(), String> {
    let url = Url::parse(&config.backend_url).map_err(|e| format!("Invalid backend_url {}: {}", config.backend_url, e))?;

    loop {
        println!("Connecting to {}...", config.backend_url);
        match connect(url.as_str()) {
            Ok((mut ws, _response)) => {
                println!("Connected to backend!");

                // Send handshake
                let handshake = AgentHandshake {
                    msg_type: "agent_handshake".to_string(),
                    device_id: config.device_id.clone(),
                    user_uid: config.user_uid.clone(),
                    user_email: config.user_email.clone(),
                };

                let hs_json = serde_json::to_string(&handshake).unwrap();
                if let Err(e) = ws.send(Message::Text(hs_json)) {
                    println!("Failed to send handshake: {e}");
                    std::thread::sleep(Duration::from_secs(3));
                    continue;
                }

                // Listen loop
                loop {
                    let msg = match ws.read() {
                        Ok(m) => m,
                        Err(err) => {
                            println!("Connection closed: {err}");
                            break;
                        }
                    };

                    match msg {
                        Message::Text(text) => {
                            if let Err(e) = handle_text(&text, &mut ws, local_body, logger) {
                                let err_msg = ErrorMessage {
                                    msg_type: "error".to_string(),
                                    error: e,
                                };
                                let _ = ws.send(Message::Text(serde_json::to_string(&err_msg).unwrap_or_default()));
                            }
                        }
                        Message::Ping(payload) => {
                            let _ = ws.send(Message::Pong(payload));
                        }
                        Message::Close(_) => {
                            println!("Backend closed connection");
                            break;
                        }
                        _ => {}
                    }
                }
            }
            Err(e) => {
                println!("Failed to connect to backend: {e}");
            }
        }

        println!("Disconnected. Trying to reconnect in 3 seconds...");
        std::thread::sleep(Duration::from_secs(3));
    }
}

fn handle_text(
    text: &str,
    ws: &mut tungstenite::WebSocket<tungstenite::stream::MaybeTlsStream<std::net::TcpStream>>,
    local_body: &mut LocalBody,
    logger: &mut Logger,
) -> Result<(), String> {
    let incoming: IncomingMessage = serde_json::from_str(text)
        .map_err(|e| format!("invalid JSON: {e}"))?;

    if let Some(t) = incoming.msg_type.as_deref() {
        if t.eq_ignore_ascii_case("ping") {
            let pong = PongMessage {
                msg_type: "pong".to_string(),
                ts_ms: now_ms(),
            };
            ws.send(Message::Text(serde_json::to_string(&pong).map_err(|e| e.to_string())?))
                .map_err(|e| e.to_string())?;
            return Ok(());
        }
    }

    let instruction = incoming.instruction.ok_or_else(|| "missing instruction".to_string())?;

    let trimmed = instruction.trim();
    if trimmed.starts_with('[') {
        let batch: Vec<CommandItem> = serde_json::from_str(trimmed)
            .map_err(|e| format!("invalid batch JSON: {e}"))?;
        for cmd in batch {
            let event = run_command(local_body, logger, &cmd)?;
            let payload = serde_json::to_string(&event).map_err(|e| e.to_string())?;
            ws.send(Message::Text(payload)).map_err(|e| e.to_string())?;
        }
        return Ok(());
    }

    let cmd = CommandItem {
        index: incoming.index.unwrap_or(0),
        instruction,
        tag: incoming.tag.unwrap_or_else(|| "ws".to_string()),
    };

    let event = run_command(local_body, logger, &cmd)?;
    let payload = serde_json::to_string(&event).map_err(|e| e.to_string())?;
    ws.send(Message::Text(payload)).map_err(|e| e.to_string())?;

    Ok(())
}

use clap::{Parser, Subcommand};
use std::fs;
use std::io::{self, Write};
use std::path::PathBuf;

mod command;
mod logger;
mod runner;
mod client;
mod tray;
mod windows;

use command::CommandItem;
use logger::Logger;
use runner::run_command;
use windows::LocalBody;
use std::env;

#[derive(Debug, serde::Deserialize, serde::Serialize, Clone)]
pub struct Config {
    pub device_id: String,
    pub user_uid: String,
    pub user_email: String,
    pub backend_url: String,
}

#[derive(Parser, Debug)]
#[command(name = "intern-local")]
#[command(about = "Windows Local PC Body (CLI stub for command flow)")]
struct Cli {
    /// Write JSONL logs to a file (one event per command)
    #[arg(long)]
    log_file: Option<PathBuf>,

    /// Emit JSON events to stdout instead of plain text
    #[arg(long, default_value_t = false)]
    json: bool,

    #[command(subcommand)]
    command: Option<Commands>,
}

#[derive(Subcommand, Debug)]
enum Commands {
    /// Execute a single instruction provided on the command line
    Exec {
        /// Numeric index for the command (useful for ordering)
        #[arg(long)]
        index: u32,

        /// Instruction text
        #[arg(long)]
        instruction: String,

        /// Optional tag for grouping/filtering
        #[arg(long, default_value = "manual")]
        tag: String,
    },

    /// Run a command sheet (JSON array) from a file
    Run {
        /// Path to JSON file
        #[arg(long)]
        file: PathBuf,

        /// Optional tag filter (only run commands matching this tag)
        #[arg(long)]
        tag: Option<String>,
    },

    /// List commands from a command sheet (JSON array)
    List {
        /// Path to JSON file
        #[arg(long)]
        file: PathBuf,
    },

    /// Start a simple interactive prompt
    Repl,

    /// Start a WebSocket client to connect to backend (default)
    Connect,
}

fn main() -> Result<(), String> {
    let cli = Cli::parse();
    let mut logger = Logger::new(cli.log_file)?;
    let mut local_body = LocalBody::new();

    match cli.command.unwrap_or(Commands::Connect) {
        Commands::Exec {
            index,
            instruction,
            tag,
        } => {
            let cmd = CommandItem {
                index,
                instruction,
                tag,
            };
            execute_command(&mut local_body, &mut logger, cli.json, &cmd)?;
        }
        Commands::Run { file, tag } => {
            let mut commands = load_commands(&file)?;
            commands.sort_by_key(|c| c.index);
            for cmd in commands {
                if let Some(ref t) = tag {
                    if cmd.tag != *t {
                        continue;
                    }
                }
                execute_command(&mut local_body, &mut logger, cli.json, &cmd)?;
            }
        }
        Commands::List { file } => {
            let mut commands = load_commands(&file)?;
            commands.sort_by_key(|c| c.index);
            for cmd in commands {
                println!("[{}] ({}) {}", cmd.index, cmd.tag, cmd.instruction);
            }
        }
        Commands::Repl => repl_loop(&mut local_body, &mut logger, cli.json)?,
        Commands::Connect => {
            // Read config.json from current directory
            let config_path = env::current_dir()
                .unwrap_or_else(|_| PathBuf::from("."))
                .join("config.json");

            if !config_path.exists() {
                return Err(format!(
                    "config.json not found at {}. Please place it next to the executable.",
                    config_path.display()
                ));
            }

            let config_data = fs::read_to_string(&config_path)
                .map_err(|e| format!("Failed to read config.json: {}", e))?;
            
            let mut config: Config = serde_json::from_str(&config_data)
                .map_err(|e| format!("Invalid JSON in config.json: {}", e))?;

            // Generate device_id if missing
            if config.device_id.trim().is_empty() {
                let new_id = uuid::Uuid::new_v4().to_string();
                println!("Generated new device_id: {}", new_id);
                config.device_id = new_id;

                let updated_json = serde_json::to_string_pretty(&config)
                    .map_err(|e| format!("Failed to serialize config: {}", e))?;
                
                fs::write(&config_path, updated_json)
                    .map_err(|e| format!("Failed to save config.json: {}", e))?;
            }

            let _tray = tray::init_tray()?;
            client::connect_and_run(config, &mut local_body, &mut logger)?;
        }
    }

    Ok(())
}

fn load_commands(path: &PathBuf) -> Result<Vec<CommandItem>, String> {
    let data = fs::read_to_string(path)
        .map_err(|e| format!("failed to read {}: {e}", path.display()))?;
    let commands: Vec<CommandItem> = serde_json::from_str(&data)
        .map_err(|e| format!("invalid JSON in {}: {e}", path.display()))?;
    Ok(commands)
}

fn execute_command(
    local_body: &mut LocalBody,
    logger: &mut Logger,
    json_out: bool,
    cmd: &CommandItem,
) -> Result<(), String> {
    let event = run_command(local_body, logger, cmd)?;

    if json_out {
        let line = serde_json::to_string(&event).map_err(|e| e.to_string())?;
        println!("{line}");
    } else {
        println!(
            "EXEC -> index={} tag={} instruction=\"{}\" status={} detail=\"{}\" duration_ms={}",
            event.index, event.tag, event.instruction, event.status, event.detail, event.duration_ms
        );
    }

    Ok(())
}

fn repl_loop(local_body: &mut LocalBody, logger: &mut Logger, json_out: bool) -> Result<(), String> {
    println!("Intern Local REPL");
    println!("Enter commands as JSON: {{\"index\":1,\"instruction\":\"...\",\"tag\":\"...\"}}");
    println!("Type 'exit' to quit.");

    let stdin = io::stdin();
    loop {
        print!("> ");
        io::stdout().flush().map_err(|e| e.to_string())?;

        let mut line = String::new();
        if stdin.read_line(&mut line).is_err() {
            return Err("failed to read input".to_string());
        }

        let line = line.trim();
        if line.eq_ignore_ascii_case("exit") {
            break;
        }
        if line.is_empty() {
            continue;
        }

        let cmd: CommandItem = match serde_json::from_str(line) {
            Ok(c) => c,
            Err(e) => {
                println!("Invalid JSON: {e}");
                continue;
            }
        };
        execute_command(local_body, logger, json_out, &cmd)?;
    }

    Ok(())
}

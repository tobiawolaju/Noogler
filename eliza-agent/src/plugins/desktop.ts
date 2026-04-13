export const EXECUTE_ON_DESKTOP = {
  name: "EXECUTE_ON_DESKTOP",
  description: "Turn high-level user goals into safe, executable desktop actions and iterate using screenshot feedback.",
  steps: [
    "Interpret the user's goal and target app/site.",
    "Break work into deterministic desktop actions.",
    "Emit one action batch at a time to the Node.js orchestrator.",
    "Request screenshot feedback after each step.",
    "Use screenshot + prior result to decide the next step.",
    "Stop once the goal is complete and summarize completion."
  ]
};

export type DesktopExecutionPayload = {
  uid: string;
  goal: string;
  screenshot_data_url?: string | null;
  last_result?: {
    index?: number;
    status?: string;
    instruction?: string;
    detail?: string;
  } | null;
};

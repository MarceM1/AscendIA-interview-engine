import { AxisScore, CandidateSignalVector, InterviewAgentConfig, InterviewPhase, InterviewSessionContext } from "../types";

export interface AgentBridgeInput {
  session: InterviewSessionContext;

  agentConfig: InterviewAgentConfig;

  policy: string;

  state: AgentCognitiveState;
  
  instructions:{
    currentPhase: InterviewPhase;
    canSuggestPhaseAdvance: boolean;
    evaluationAxes?: string[];
  }

  userMessage?: string;
}
export interface AgentBridgeOutput {
  agentMessage: string;

  raw:{
    provider?: string;
    phase: InterviewPhase;
  }
  meta?: {
    latencyMs?: number;
    raw?: unknown;
  };
}

export interface AgentBridge {
  run(input: AgentBridgeInput): Promise<AgentBridgeOutput>;
}

export interface BuildAgentInputParams {
    session: InterviewSessionContext;
    state: AgentCognitiveState;
    agentConfig: InterviewAgentConfig;
    policy: string;
    lastUserMessage?: string;
}

export interface AgentCognitiveState {
  phase: InterviewPhase;
  signals: CandidateSignalVector[];
  axisScores?: AxisScore;
  detectedWeaknesses?: string[];
  detectedStrengths?: string[];
}

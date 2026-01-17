import { DecisionReason } from "./types";
import { InterviewEngineState } from "../../types";

export interface PhaseConditionResult {
  passed: boolean;
  reasons: DecisionReason[];
}


export interface PhaseCondition {
  evaluate(state: InterviewEngineState): PhaseConditionResult;
}

export interface DecisionReason {
    code: string;
    description: string;
    evidence?: Record<string, unknown>;
}

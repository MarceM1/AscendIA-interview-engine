import { InterviewPhase } from "../../types";
import { DecisionReason } from "../phase/types";

export interface InterviewEngineState {
  phase: InterviewPhase;
  signals: CandidateSignalVector[];
  axisScores?: AxisScore;
  detectedWeaknesses?: string[];
  detectedStrengths?: string[];

  meta: {
    dificultyAdjusted: boolean;
    followUpsTriggered: number;
    deepDiveTriggered: boolean;
  };
}

export type InterviewPhase =
  | "ORIENTATION"
  | "EXPLORATION"
  | "EVALUATION"
  | "CLOSING";

export type DecisionOutcome =
  | {
      type: "NO_OP";
      reasons: DecisionReason[];
    }
  | {
      type: "ADVANCE_PHASE";
      from: InterviewPhase;
      to: InterviewPhase;
      reasons: DecisionReason[];
    }
  | {
      type: "COMPLETE_INTERVIEW";
      reasons: DecisionReason[];
    };

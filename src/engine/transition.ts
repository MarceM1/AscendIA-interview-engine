import { InterviewPhase } from "@/types/types";
import { PhaseCondition} from "../phase/phaseCondition";
import { MinimumSignalsCondition } from "../conditions/MinimumSignalsCondition";
import {  SignalConfidenceCondition } from "../conditions/SignalConfidenceCondition";
import { EvaluationCoverageCondition } from "../conditions/EvaluationCoverageCondition";
import { NoCriticalGapsCondition } from "../conditions/NoCriticalGapCondition";
import { DecisionReachedCondition } from "../conditions/DecisionReachedCondition";
import { MaxDecisionTimeExceededCondition } from "../conditions/MaxDecisionTimeExceededCondition";
import { DecisionOutcome } from "../types/decisionOutcome";
import { SessionRuntimeAdapter } from "../types";
export type RuleMode = "ALL" | "ANY";

export interface PhaseRuleSet {
    fromPhase: InterviewPhase;
    toPhase: InterviewPhase;
    conditions: PhaseCondition[];
    mode: RuleMode // ALL: all conditions must pass, ANY: at least one must pass
}

export const explorationToEvaluationRuleSet: PhaseRuleSet = {
  fromPhase: "EXPLORATION",
  toPhase: "EVALUATION",
  mode: "ALL",
  conditions: [
    new MinimumSignalsCondition(1),
    new SignalConfidenceCondition(0.7),
  ],
};

export const evaluationToDecisionRuleSet: PhaseRuleSet = {
  fromPhase: "EVALUATION",
  toPhase: "DECISION",
  mode: "ALL",
  conditions: [
    new EvaluationCoverageCondition(0.8),
    new NoCriticalGapsCondition(),
  ],
};

export const decisionToClosureRuleSet: PhaseRuleSet = {
  fromPhase: "DECISION",
  toPhase: "CLOSURE",
  mode: "ANY",
  conditions: [
    new DecisionReachedCondition(),
    new MaxDecisionTimeExceededCondition(),
  ],
};



export class DecisionExecutor {
  constructor(private readonly adapter: SessionRuntimeAdapter) {}

  execute(outcome: DecisionOutcome): void {
    switch (outcome.type) {
      case "ADVANCE_PHASE":
        this.adapter.transitionTo(outcome.to, outcome.reasons);
        break;

      case "COMPLETE_INTERVIEW":
        this.adapter.complete(outcome.reasons);
        break;

      case "NO_OP":
        // log / ignore
        break;
    }
  }
}





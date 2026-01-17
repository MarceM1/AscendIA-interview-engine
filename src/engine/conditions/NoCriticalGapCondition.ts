import { InterviewEngineState } from "../../types";
import { PhaseCondition, PhaseConditionResult } from "../phase/phaseCondition";

export class NoCriticalGapsCondition implements PhaseCondition {
  evaluate(state: InterviewEngineState): PhaseConditionResult {
    const hasGaps = (state.detectedWeaknesses?.length ?? 0) > 0;

    return {
      passed: !hasGaps,
      reasons: hasGaps
        ? [
            {
              code: "CRITICAL_GAPS_DETECTED",
              description: "Critical weaknesses detected during evaluation",
              evidence: {
                weaknesses: state.detectedWeaknesses,
              },
            },
          ]
        : [],
    };
  }
}

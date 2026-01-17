import { InterviewEngineState } from "../../types";
import { PhaseCondition, PhaseConditionResult } from "../phase/phaseCondition";

export class EvaluationCoverageCondition implements PhaseCondition {
  constructor(private readonly minCoverage: number) {}

  evaluate(state: InterviewEngineState): PhaseConditionResult {
    const scores = state.axisScores
      ? Object.values(state.axisScores)
      : [];

    if (scores.length === 0) {
      return {
        passed: false,
        reasons: [
          {
            code: "NO_EVALUATION_DATA",
            description: "No evaluation data available to compute coverage",
          },
        ],
      };
    }

    const evaluated = scores.filter((score) => score >= 60).length;
    const coverage = evaluated / scores.length;

    const passed = coverage >= this.minCoverage;

    return {
      passed,
      reasons: passed
        ? []
        : [
            {
              code: "INSUFFICIENT_EVALUATION_COVERAGE",
              description: `Coverage ${coverage.toFixed(2)} < ${this.minCoverage}`,
              evidence: { coverage },
            },
          ],
    };
  }
}

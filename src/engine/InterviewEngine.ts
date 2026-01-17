import {
  InterviewEngineState,
  DecisionOutcome,
  Phase,
} from "../types";

import { PhaseRuleSet } from "./phases";
import { evaluatePhaseRules } from "./decisionRules";

/**
 * InterviewEngine
 *
 * Núcleo determinista del sistema.
 * Consume señales estructuradas y decide transiciones de fase
 * sin depender del modelo de IA.
 */
export class InterviewEngine {
  decide(
    state: InterviewEngineState,
    rules: PhaseRuleSet[]
  ): DecisionOutcome {
    // Guard: entrevista finalizada
    if (state.phase === Phase.FINAL) {
      return {
        type: "COMPLETE_INTERVIEW",
        reasons: [
          {
            code: "FINAL_PHASE_REACHED",
            description: "La entrevista alcanzó su fase final.",
            evidence: { phase: state.phase },
          },
        ],
      };
    }

    // Reglas aplicables a la fase actual
    const applicableRules = rules.filter(
      r => r.fromPhase === state.phase
    );

    if (applicableRules.length === 0) {
      return {
        type: "NO_OP",
        reasons: [
          {
            code: "NO_RULES",
            description: "No existen reglas para la fase actual.",
            evidence: { phase: state.phase },
          },
        ],
      };
    }

    // Evaluación determinista
    const evaluations = applicableRules.map(rule => ({
      rule,
      result: evaluatePhaseRules(state, rule),
    }));

    const eligible = evaluations.filter(
      e => e.result.eligible
    );

    // Conflicto explícito
    if (eligible.length > 1) {
      throw new Error(
        `Ambigüedad de decisión en fase ${state.phase}`
      );
    }

    // Transición válida
    if (eligible.length === 1) {
      const { rule, result } = eligible[0];
      return {
        type: "ADVANCE_PHASE",
        from: rule.fromPhase,
        to: rule.toPhase,
        reasons: result.reasons,
      };
    }

    // Default: sostener fase
    return {
      type: "NO_OP",
      reasons: evaluations.flatMap(e => e.result.reasons),
    };
  }
}

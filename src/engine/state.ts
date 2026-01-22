import {
  AgentMarker,
  InterviewEngineState,
  InterviewSessionContext,
  Phase,
} from "../types";


  // Entrada de una iteración del Interview Engine.
  // Representa un turno de la conversación.

export interface EngineStepInput {
  session: InterviewSessionContext;
  state: InterviewEngineState;
  agentOutput: {
    raw: string;
    timestamp: number;
  };
}

// Resultado determinista de procesar un turno.

export interface EngineStepResult {
  nextState: InterviewEngineState;
  markers: AgentMarker[];

  control: {
    phaseAdvanced: boolean;
    interviewCompleted: boolean;
  };
}

// Deriva señales de control a partir de la transición de estado.
// No ejecuta lógica de negocio.

export function deriveEngineControl(
  previous: InterviewEngineState,
  next: InterviewEngineState
): EngineStepResult["control"] {
  return {
    phaseAdvanced: previous.phase !== next.phase,
    interviewCompleted: next.phase === Phase.FINAL,
  };
}

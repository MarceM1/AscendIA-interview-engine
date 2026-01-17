import { InterviewEngineState } from "../src/types/InterviewEngineTypes";

// Mocks and helpers
const mockSession = {
  sessionId: "session_123",
  interviewId: "interview_456",
  userId: "user_789",
  area: "TECNOLOGIA_IT",
  position: "Desarrollador de Software",
  interviewer: "LUCIANA",
};

test("advances from EXPLORATION to EVALUATION when confidence and coverage are sufficient", () => {
  //1. Configurar el estado inicial
  const initialState: InterviewEngineState = {
    phase: "EXPLORATION",
    signals: [{ confidence: 0.7 }],
    axisScores: { communication: 65 },
    detectedStrengths: [],
    detectedWeaknesses: [],
    meta: {
      dificultyAdjusted: false,
      followUpsTriggered: 0,
      deepDiveTriggered: false,
    },
  };

  //2. Runtime Manager procesa las señales del agente
  const runtime = new InterviewRuntimeManager();
  const runtimeResult = runtime.handle({
    session: mockSession,
    state: initialState,
    agentMessage: `
  SIGNAL_UPDATE confidence=0.7
  AXIS_EVALUATION axis=communication score=65
`,
  });

  //3. Decision Engine evalúa la transición de fase
  const decisionEngine = new DecisionEngine();

  const outcome = decisionEngine.decide(runtimeResult.nextState, phaseRules);

  //4. Verificar que la fase haya avanzado correctamente
  expect(outcome).toEqual({
    type: "ADVANCE_PHASE",
    from: "EXPLORATION",
    to: "EVALUATION",
    reasons: expect.any(Array),
  });
});

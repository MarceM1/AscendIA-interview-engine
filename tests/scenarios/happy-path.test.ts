import { InterviewEngineState } from "../../src/types/InterviewEngineTypes";

// Mocks and helpers
const mockSession = {
  sessionId: "session_123",
  interviewId: "interview_456",
  userId: "user_789",
  area: "TECNOLOGIA_IT",
  position: "Desarrollador de Software",
  interviewer: "LUCIANA",
};
function runRuntime(state: InterviewEngineState, agentMessage: string) {
  const runtime = new InterviewRuntimeManager();

  return runtime.handle({
    session: mockSession,
    state,
    agentMessage,
  });
}

test("advances from EXPLORATION to EVALUATION when confidence and coverage are sufficient", () => {
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

  const runtimeResult = runRuntime(
    initialState,
    `
      SIGNAL_UPDATE confidence=0.7
      AXIS_EVALUATION axis=communication score=65
    `,
  );

  const decisionEngine = new DecisionEngine();

  const outcome = decisionEngine.decide(runtimeResult.nextState, phaseRules);

  expect(outcome.type).toBe("ADVANCE_PHASE");
  expect(outcome.from).toBe("EXPLORATION");
  expect(outcome.to).toBe("EVALUATION");
});


import { InterviewEngineState } from "../../src/types/InterviewEngineTypes";

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

test("does not advance phase when signal confidence is below threshold", () => {
  const initialState: InterviewEngineState = {
    phase: "EXPLORATION",
    signals: [{ confidence: 0.3 }],
    axisScores: { communication: 70 },
    detectedStrengths: [],
    detectedWeaknesses: [],
    meta: {},
  };

  const runtimeResult = runRuntime(
    initialState,
    `
      SIGNAL_UPDATE confidence=0.3
      AXIS_EVALUATION axis=communication score=70
    `
  );

  const outcome = new DecisionEngine().decide(
    runtimeResult.nextState,
    phaseRules
  );

  expect(outcome.type).toBe("NO_OP");
});

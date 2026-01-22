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

test("does not advance phase when minimum signals are not met", () => {
  const initialState: InterviewEngineState = {
    phase: "EXPLORATION",
    signals: [],
    axisScores: {},
    detectedStrengths: [],
    detectedWeaknesses: [],
    meta: {},
  };

  const runtimeResult = runRuntime(
    initialState,
    `
      AXIS_EVALUATION axis=communication score=70
    `
  );

  const outcome = new DecisionEngine().decide(
    runtimeResult.nextState,
    phaseRules
  );

  expect(outcome.type).toBe("NO_OP");
});



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

test("throws when multiple phase transitions are eligible", () => {
  const stateWithConflictingSignals: InterviewEngineState = {
    phase: "EVALUATION",
    signals: [{ confidence: 0.9 }],
    axisScores: { communication: 90 },
    detectedStrengths: ["clarity"],
    detectedWeaknesses: [],
    meta: {},
  };

  expect(() => {
    new DecisionEngine().decide(
      stateWithConflictingSignals,
      conflictingPhaseRules
    );
  }).toThrow("Ambiguous phasedecision");
});

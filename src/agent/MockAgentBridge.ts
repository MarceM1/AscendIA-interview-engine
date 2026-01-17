import { AgentBridge, AgentBridgeInput, AgentBridgeOutput } from "./types";

export class MockAgentBridge implements AgentBridge {
  async run(input: AgentBridgeInput): Promise<AgentBridgeOutput> {
    return {
      agentMessage: `
Gracias por tu respuesta.

{SIGNAL_UPDATE {"confidence": 0.8}}
{AXIS_EVALUATION {"axis":"communication","score":65}}

¿Podrías profundizar un poco más en ese punto?
      `.trim(),
      raw: {
        provider: "MockProvider",
        phase: input.state.phase,
      },
      meta: {
        latencyMs: 100,
      },
    };
  }
}

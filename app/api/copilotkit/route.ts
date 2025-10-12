import {
  CopilotRuntime,
  AnthropicAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";

const runtime = new CopilotRuntime();

const serviceAdapter = new AnthropicAdapter({
  model: "claude-3-5-sonnet-20241022",
});

const handler = copilotRuntimeNextJSAppRouterEndpoint({
  runtime,
  serviceAdapter,
  endpoint: "/api/copilotkit",
});

export const GET = handler.GET;
export const POST = handler.POST;
export const OPTIONS = handler.OPTIONS;

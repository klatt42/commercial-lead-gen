'use client';

import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import { ReactNode } from "react";
import { AI_INSTRUCTIONS } from "../lib/copilot/instructions";
import { useDamageAssessmentActions } from "../lib/copilot/actions";

interface CopilotProviderProps {
  children: ReactNode;
}

function CopilotActions() {
  useDamageAssessmentActions();
  return null;
}

export default function CopilotProvider({ children }: CopilotProviderProps) {
  return (
    <CopilotKit
      runtimeUrl="/api/copilotkit"
      showDevConsole={process.env.NODE_ENV === "development"}
    >
      <CopilotActions />
      {children}
      <CopilotPopup
        instructions={AI_INSTRUCTIONS}
        labels={{
          title: "Commercial Damage Assessment",
          initial: "Welcome to Commercial Restoration Services! I'm here to help assess your commercial property damage and provide an instant cost estimate. Tell me what happened - water damage, fire, mold, or other emergency?",
        }}
        defaultOpen={false}
        clickOutsideToClose={false}
      />
    </CopilotKit>
  );
}

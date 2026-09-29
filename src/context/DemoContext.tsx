import React, { createContext, useContext, useState } from 'react';

export interface DemoStep {
  step: number;
  title: string;
  description: string;
  targetRoute: string;
  actionHint: string;
  highlightSelector?: string;
}

export const DEMO_STEPS: DemoStep[] = [
  {
    step: 1,
    title: 'Select Synthetic Actor "ShadowX"',
    description: 'Begin by filtering the database and choosing our primary synthetic subject ShadowX (ACTOR-DEMO-001).',
    targetRoute: '/actors',
    actionHint: 'Click on ShadowX card to open the dossier.',
    highlightSelector: 'actor-card-ACTOR-DEMO-001'
  },
  {
    step: 2,
    title: 'Inspect Actor Profile Dossier',
    description: 'Examine first/last observed dates, categorization, risk rating, and the synthetic academic notice.',
    targetRoute: '/actors/ACTOR-DEMO-001',
    actionHint: 'Review status indicators and high-level persona summary.',
    highlightSelector: 'actor-profile-header'
  },
  {
    step: 3,
    title: 'Identify Alternate Digital Handles',
    description: 'Correlate ShadowX with aliases Shadow_X01, XShadow, and ShadowOperator across underground forums.',
    targetRoute: '/actors/ACTOR-DEMO-001',
    actionHint: 'Observe the 4 linked personas and their stylometric consistency scores.',
    highlightSelector: 'section-handles'
  },
  {
    step: 4,
    title: 'Launch Interactive Relationship Graph',
    description: 'Switch to the graph visualization to explore entity clusters, hubs, and connection degrees.',
    targetRoute: '/graph?focus=ACTOR-DEMO-001',
    actionHint: 'Notice how ShadowX anchors handles, PGP keys, wallets, and hosting nodes.',
    highlightSelector: 'graph-viewport'
  },
  {
    step: 5,
    title: 'Trace Cryptographic PGP Footprint',
    description: 'Inspect PGP-DEMO-001 (0x8A7C93F14E2B5A09) which directly binds ShadowX to Shadow_X01.',
    targetRoute: '/graph?focus=ACTOR-DEMO-001',
    actionHint: 'Click the purple PGPKey node in the graph or inspector sidebar.',
    highlightSelector: 'node-PGP-DEMO-001'
  },
  {
    step: 6,
    title: 'Trace Blockchain Wallet Nexus',
    description: 'Uncover WALLET-DEMO-001 multi-hop clustering linking ShadowX to GhostByte mixer inflows.',
    targetRoute: '/actors/ACTOR-DEMO-001',
    actionHint: 'Examine transaction volume ($1.42M) and shared cluster tags.',
    highlightSelector: 'section-wallets'
  },
  {
    step: 7,
    title: 'Execute Longitudinal Timeline Audit',
    description: 'Track the chronological sequence from forum registration (Feb 2025) to recent 2026 listings.',
    targetRoute: '/timeline?actorId=ACTOR-DEMO-001',
    actionHint: 'Filter events by date range and view corroborating raw sample evidence.',
    highlightSelector: 'timeline-container'
  },
  {
    step: 8,
    title: 'Run AI Stylometric & Behavioral Engine',
    description: 'Compare ShadowX against suspected affiliates to assess lexical similarities and diurnal routines.',
    targetRoute: '/ai-analysis?actorA=ACTOR-DEMO-001&actorB=ACTOR-DEMO-002',
    actionHint: 'Review cosine token similarity and circadian 24-hour activity heatmaps.',
    highlightSelector: 'ai-analysis-container'
  },
  {
    step: 9,
    title: 'Inspect Multi-Factor Evidence Breakdown',
    description: 'Review the transparent Analytical Association Confidence score (84%) across all 5 dimensions.',
    targetRoute: '/ai-analysis?actorA=ACTOR-DEMO-001&actorB=ACTOR-DEMO-002',
    actionHint: 'Examine radar chart weighting: Identifiers (30%), Stylometry (20%), Behavior (20%), Platforms (15%), Temporal (15%).',
    highlightSelector: 'evidence-breakdown'
  },
  {
    step: 10,
    title: 'Generate & Export Investigation Report',
    description: 'Compile an evidence dossier with verified timestamps, indicators, and download as JSON/CSV or print PDF.',
    targetRoute: '/reports/ACTOR-DEMO-001',
    actionHint: 'Click "Download PDF", "Export CSV", or "Export JSON" to complete the investigation.',
    highlightSelector: 'report-export-actions'
  }
];

interface DemoContextType {
  isActive: boolean;
  currentStepIndex: number;
  currentStep: DemoStep;
  startDemo: () => void;
  stopDemo: () => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (index: number) => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const DemoProvider: React.FC<{ children: React.ReactNode; onNavigate?: (route: string) => void }> = ({
  children,
  onNavigate
}) => {
  const [isActive, setIsActive] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const currentStep = DEMO_STEPS[currentStepIndex];

  const startDemo = () => {
    setIsActive(true);
    setCurrentStepIndex(0);
    if (onNavigate) onNavigate(DEMO_STEPS[0].targetRoute);
  };

  const stopDemo = () => {
    setIsActive(false);
  };

  const nextStep = () => {
    if (currentStepIndex < DEMO_STEPS.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      if (onNavigate) onNavigate(DEMO_STEPS[nextIdx].targetRoute);
    } else {
      setIsActive(false);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      const prevIdx = currentStepIndex - 1;
      setCurrentStepIndex(prevIdx);
      if (onNavigate) onNavigate(DEMO_STEPS[prevIdx].targetRoute);
    }
  };

  const goToStep = (index: number) => {
    if (index >= 0 && index < DEMO_STEPS.length) {
      setCurrentStepIndex(index);
      if (onNavigate) onNavigate(DEMO_STEPS[index].targetRoute);
    }
  };

  return (
    <DemoContext.Provider
      value={{
        isActive,
        currentStepIndex,
        currentStep,
        startDemo,
        stopDemo,
        nextStep,
        prevStep,
        goToStep
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) throw new Error('useDemo must be used within a DemoProvider');
  return context;
};

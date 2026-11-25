export type LabDemo = {
  id: string;
  area: 'rag' | 'agents' | 'automation' | 'mcp' | 'llm-evaluation';
  title: string;
  description: readonly [string, string];
  url: string;
};

export const labDemos: LabDemo[] = [];

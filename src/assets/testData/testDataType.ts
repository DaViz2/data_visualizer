export interface NodeData {
  id: number;
  name: string;
}

export interface LinkData {
  source: number;
  target: number;
}

export interface GraphData {
  nodes: NodeData[];
  edges: LinkData[];
}

export type ComponentData = GraphData | undefined;

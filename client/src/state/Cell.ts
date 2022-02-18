export type CellTypes = "sandbox" | "markdown";

export interface Cell {
  id: string;
  type: CellTypes;
  content: string;
}
import { attributeValueObject } from "src/models/attributeValue";

export interface attributeSidebarObject {
  key: string;
  kind: string;
  attributeCount: number;
  isDropped: boolean | null;
  values: Array<attributeValueObject>;
}

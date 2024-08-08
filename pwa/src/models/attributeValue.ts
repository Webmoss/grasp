import { floorAskPriceObject } from "src/models/floorAskPrice";

export interface attributeValueObject {
  value: string;
  floorAskPrice: floorAskPriceObject;
  count: number;
}

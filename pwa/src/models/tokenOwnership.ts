import { floorAskPriceObject } from "src/models/floorAskPrice";

export interface tokenOwnershipObject {
  tokenCount: string;
  onSaleCount: string;
  acquiredAt: string;
  floorAsk: floorAskPriceObject;
}

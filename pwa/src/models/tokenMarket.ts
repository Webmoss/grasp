import { floorAskPriceObject } from "src/models/floorAskPrice";

export interface tokenMarketObject {
  chain: string;
  floorAsk: floorAskPriceObject;
}

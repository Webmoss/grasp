import { priceObject } from "src/models/price";
import { feeBreakdownObject } from "src/models/feeBreakdown";

export interface lastSaleObject {
  feeBreakdown: Array<feeBreakdownObject>;
  fillSource: string;
  orderSource: string;
  paidFullRoyalty: boolean;
  price: priceObject;
  royaltyFeeBps: number;
  timestamp: number;
}

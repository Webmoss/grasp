import { amountObject } from "src/models/amount";
import { currencyObject } from "src/models/currency";
import { sourceObject } from "src/models/source";

export interface floorAskPriceObject {
  id: string;
  price: {
    amount: amountObject;
    currency: currencyObject;
  };
  amount: amountObject;
  currency: currencyObject;
  maker: string;
  kind: string;
  validFrom: number;
  validUntil: number;
  source: sourceObject;
}

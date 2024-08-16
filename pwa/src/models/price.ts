import { amountObject } from "src/models/amount";
import { currencyObject } from "src/models/currency";
import { netAmountObject } from "src/models/netAmount";

export interface priceObject {
  amount: amountObject;
  currency: currencyObject;
  netAmount: netAmountObject;
}

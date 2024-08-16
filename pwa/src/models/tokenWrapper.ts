import { tokenDataObject } from "src/models/tokenData";
import { tokenMarketObject } from "src/models/tokenMarket";
import { tokenOwnershipObject } from "src/models/tokenOwnership";

export interface tokenWrapperObject {
  token: tokenDataObject;
  market: tokenMarketObject;
  ownership?: tokenOwnershipObject;
  updatedAt?: string
}

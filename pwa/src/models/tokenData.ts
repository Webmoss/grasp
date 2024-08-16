import { attributeObject } from "src/models/attribute";
import { collectionObject } from "src/models/collection";
// import { mediaObject } from "src/models/media";
import { metadataObject } from "src/models/metadata";
import { lastSaleObject } from "src/models/lastSale";
import { rarityObject } from "src/models/rarity";

export interface tokenDataObject {
  contract: string;
  tokenId: string;
  name: string | null;
  description: string | null;
  image: string;
  imageSmall: string;
  imageLarge: string;
  metadata: metadataObject;
  media: string;
  kind: string;
  isFlagged: boolean;
  isSpam: boolean;
  isNsfw: boolean;
  lastFlagUpdate: string | null;
  lastFlagChange: string | null;
  lastSale: lastSaleObject | null;
  supply: string;
  remainingSupply: string;
  rarity: rarityObject | number;
  rarityRank: number;
  collection: collectionObject;
  owner: string;
  chainId: number;
  type: string;
  createdAt: string;
  mintedAt: string;
  mintStages: Array<any>;
  metadataDisabled: boolean;
  updated_date: string;
  attributes: Array<attributeObject>;

}

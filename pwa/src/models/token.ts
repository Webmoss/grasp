import { metadataObject } from "src/models/metadata";
import { attributeObject } from "src/models/attribute";
import { rarityObject } from "src/models/rarity";

export interface tokenObject {
  chain: string;
  contract: string;
  contract_address: string;
  tokenId: string;
  token_id: string;
  metadata_url: string;
  file_information: string;
  supply: string;
  type: string;
  mint_date: string;
  updated_date: string;
  file_url: string;
  animation_url: string;
  cached_file_url: string;
  cached_animation_url: string;
  creator_address: string;
  metadata: metadataObject;
  rarity: rarityObject;
  attributes: Array<attributeObject>;
}

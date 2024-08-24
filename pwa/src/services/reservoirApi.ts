import axios from "axios";

/* Services api keys */
const reservoirAPI = process.env.VUE_APP_RESEVOIR_NFT_API_KEY;

/* Blockchain ID */
let hostedAPI = "https://api.reservoir.tools";
let polygonAPI = "https://api-polygon.reservoir.tools/";
  // process.env.VUE_APP_NODE_ENV === "development"
  //   ? "https://api-goerli.reservoir.tools"
  //   : "https://api.reservoir.tools";

export default class reservoirApi {
  /**
   * Reservoir API - Search Collections by Contract Address
   * Use this API to explore a collection's metadata and statistics (sales, volume, etc).
   * @param {String} collection Filter to a particular collection with collection-id. Example: 0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63
   * @param {String} slug Filter to a particular collection slug. Example: boredapeyachtclub
   * @param {String} collectionsSetId Filter to a particular collection set. Example: 8daa732ebe5db23f267e58d52f1c9b1879279bcdf4f78b8fb563390e6946ea65
   * @param {String} community Filter to a particular community. Example: artblocks
   * @param {Array} contract array of strings
   * @param {String} name Search for collections that match a string. Example: bored
   * @param {Number} maxFloorAskPrice Maximum floor price of the collection
   * @param {Number} minFloorAskPrice Minumum floor price of the collection
   * @param {Boolean} includeAttributes If true, attributes will be included in the response. Must filter by id or slug to a particular collection.
   * @param {Boolean} includeSalesCount If true, sales count (1 day, 7 day, 30 day, all time) will be included in the response. Must filter by id or slug to a particular collection.
   * @param {Boolean} includeMintStages If true, mint data for the collection will be included in the response. defaults to false
   * @param {Boolean} normalizeRoyalties If true, prices will include missing royalties to be added on-top. defaults to false
   * @param {Boolean} useNonFlaggedFloorAsk If true, return the non flagged floor ask. Supported only when normalizeRoyalties is false. defaults to false
   * @param {String} sortBy Order the items are returned in the response. Options are #DayVolume, createdAt, or floorAskPrice defaults to allTimeVolume
   * @param {Number} limit Amount of items returned in response. Default and max limit is 20. defaults to 20
   * @param {String} continuation Use continuation token to request next offset of items.
   * @param {String} displayCurrency Input any ERC20 address to return result in given currency
   * @returns {Promise<Object|Error>}
   */
  async retrieveCollections(
    collection: string,
    slug?: string | null,
    collectionsSetId?: string | null,
    community?: string | null,
    contract?: Array<string> | null,
    name?: string | null,
    maxFloorAskPrice?: number | null,
    minFloorAskPrice?: number | null,
    includeAttributes?: string | null,
    includeSalesCount?: string | null,
    includeMintStages?: string | null,
    normalizeRoyalties?: string | null,
    useNonFlaggedFloorAsk?: string | null,
    sortBy?: string | null,
    limit?: number | null,
    continuation?: string | null,
    displayCurrency?: string | null
  ) {
    try {
      const response = await axios.get(`${hostedAPI}/collections/v6`, {
        headers: {
          accept: "*/*",
          "x-api-key": reservoirAPI,
        },
        params: {
          id: collection,
          slug: slug,
          collectionsSetId: collectionsSetId,
          community: community,
          contract: contract,
          name: name,
          maxFloorAskPrice: maxFloorAskPrice,
          minFloorAskPrice: minFloorAskPrice,
          includeAttributes: includeAttributes,
          includeSalesCount: includeSalesCount,
          includeMintStages: includeMintStages,
          normalizeRoyalties: normalizeRoyalties,
          useNonFlaggedFloorAsk: useNonFlaggedFloorAsk,
          sortBy: sortBy,
          limit: limit,
          continuation: continuation,
          displayCurrency: displayCurrency,
        },
      });
      const data = response.data;
      const nftCollection = {
        collection: data.collections[0],
      };
      return nftCollection;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async retrievePolygonCollections(
    collection: string,
    // slug?: string | null,
    // collectionsSetId?: string | null,
    // community?: string | null,
    // contract?: Array<string> | null,
    // name?: string | null,
    // maxFloorAskPrice?: number | null,
    // minFloorAskPrice?: number | null,
    // includeAttributes?: string | null,
    // includeSalesCount?: string | null,
    // includeMintStages?: string | null,
    // normalizeRoyalties?: string | null,
    // useNonFlaggedFloorAsk?: string | null,
    // sortBy?: string | null,
    // limit?: number | null,
    // continuation?: string | null,
    // displayCurrency?: string | null
  ) {
    try {
      // const response = await axios.get(`${hostedAPI}/collections/v7`, {
      //   headers: {
      //     accept: "*/*",
      //     "x-api-key": reservoirAPI,
      //   },
      //   params: {
      //     id: collection,
      //     // slug: slug,
      //     // collectionsSetId: collectionsSetId,
      //     // community: community,
      //     // contract: contract,
      //     // name: name,
      //     // maxFloorAskPrice: maxFloorAskPrice,
      //     // minFloorAskPrice: minFloorAskPrice,
      //     // includeAttributes: includeAttributes,
      //     // includeSalesCount: includeSalesCount,
      //     // includeMintStages: includeMintStages,
      //     // normalizeRoyalties: normalizeRoyalties,
      //     // useNonFlaggedFloorAsk: useNonFlaggedFloorAsk,
      //     // sortBy: sortBy,
      //     // limit: limit,
      //     // continuation: continuation,
      //     // displayCurrency: displayCurrency,
      //   },
      // });

      let newData = {
        collections: [],
        continuation: ""
      };

      const options = {
        method: 'GET',
        url: 'https://api-polygon.reservoir.tools/collections/v7',
        params: {id: collection, limit: '12' },
        headers: {accept: '*/*', 'x-api-key': reservoirAPI}
      };

      await axios
        .request(options)
        .then(function (response) {
          newData = response.data
        })
        .catch(function (error) {
          console.error(error);
        });

      console.log("Collection", newData.collections[0]);
      const nftCollection = {
        collection: newData.collections[0],
      };
      return nftCollection;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async retrieveAllCollections(contracts: Array<string>) {
    try {
      const response = await axios.get(`${hostedAPI}/collections/v6`, {
        headers: {
          accept: "*/*",
          "x-api-key": reservoirAPI,
        },
        params: {
          contract: contracts,
        },
      });
      const data = response.data;
      const nftCollection = {
        collection: data.collections[0],
      };
      return nftCollection;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Reservoir API - Tokens
   * Get a list of tokens with full metadata. This is useful for showing a single token page, or scenarios that require more metadata.
   * @param {String} collection Filter to a particular collection with collection-id. Example: 0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63
   * @param {String} collectionsSetId Filter to a particular collection set. Example: 8daa732ebe5db23f267e58d52f1c9b1879279bcdf4f78b8fb563390e6946ea65
   * @param {String} community Filter to a particular community. Example: artblocks
   * @param {Array} contract array of strings
   * @param {String} tokenName Filter to a particular token by name. This is case sensitive. Example: token #1
   * @param {Array} tokens Array of tokens. Max limit is 50. Example: tokens[0]: 0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63:704 tokens[1]: 0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63:979
   * @param {String} tokenSetId Filter to a particular token set. Example: token:0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270:129000685
   * @param {Array} attributes Filter to a particular attribute. Attributes are case sensitive. Note: Our docs do not support this parameter correctly. To test, you can use the following URL in your browser. Example: https://api.reservoir.tools/tokens/v6?collection=0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63&attributes[Type]=Original or https://api.reservoir.tools/tokens/v6?collection=0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63&attributes[Type]=Original&attributes[Type]=Sibling
   * @param {String} source Domain of the order source. Example opensea.io (Only listed tokens are returned when filtering by source)
   * @param {String} nativeSource Domain of the order source. Example www.opensea.com. For a native marketplace, return all tokens listed on this marketplace, even if better prices are available on other marketplaces.
   * @param {Number} minRarityRank Get tokens with a min rarity rank (inclusive)
   * @param {Number} maxRarityRank Get tokens with a max rarity rank (inclusive)
   * @param {Number} minFloorAskPrice Get tokens with a min floor ask price (inclusive); use native currency
   * @param {Number} maxFloorAskPrice Get tokens with a max floor ask price (inclusive); use native currency
   * @param {Number} flagStatus Allowed only with collection and tokens filtering! -1 = All tokens (default) / 0 = Non flagged tokens / 1 = Flagged tokens
   * @param {String} sortBy Order the items are returned in the response. Options are floorAskPrice, tokenId, and rarity. defaults to floorAskPrice
   * @param {String} sortDirection asc or desc
   * @param {Array} currencies If true, attributes will be included in the response. Must filter by id or slug to a particular collection.
   * @param {Number} limit Amount of items returned in response. Default and max limit is 20. defaults to 20
   * @param {String} includeTopBid If true, top bid will be returned in the response. defaults to false
   * @param {String} includeAttributes If true, attributes will be returned in the response. defaults to false
   * @param {String} includeQuantity If true, quantity filled and quantity remaining will be returned in the response. defaults to false
   * @param {String} includeDynamicPricing If true, dynamic pricing data will be returned in the response. defaults to false
   * @param {String} includeLastSale If true, mint data for the collection will be included in the response. defaults to false
   * @param {String} normalizeRoyalties If true, prices will include missing royalties to be added on-top. defaults to false
   * @param {String} continuation Use continuation token to request next offset of items.
   * @param {String} displayCurrency Input any ERC20 address to return result in given currency
   * @returns {Promise<Object|Error>}
   */
  async retrieveTokens(
    collection: string,
    collectionsSetId?: string | null,
    community?: string | null,
    contract?: Array<string> | null,
    tokenName?: string | null,
    tokens?: string | null,
    tokenSetId?: string | null,
    attributes?: object | null,
    source?: string | null,
    nativeSource?: string | null,
    minRarityRank?: string | null,
    maxRarityRank?: string | null,
    minFloorAskPrice?: string | null,
    maxFloorAskPrice?: string | null,
    flagStatus?: number | null,
    sortBy?: string | null,
    sortDirection?: string | null,
    currencies?: Array<string> | null,
    limit?: number | null,
    includeTopBid?: string | null,
    includeAttributes?: string | null,
    includeQuantity?: string | null,
    includeDynamicPricing?: string | null,
    includeLastSale?: string | null,
    normalizeRoyalties?: string | null,
    continuation?: string | null,
    displayCurrency?: string | null
  ) {
    try {
      // console.log("collection", collection);
      // console.log("collectionsSetId", collectionsSetId);
      // console.log("community", community);
      // console.log("contract", contract);
      // console.log("tokenName", tokenName);
      // console.log("tokens", tokens);
      // console.log("tokenSetId", tokenSetId);
      // console.log("attributes", attributes);
      // console.log("source", source);
      // console.log("nativeSource", nativeSource);
      // console.log("minRarityRank", minRarityRank);
      // console.log("maxRarityRank", maxRarityRank);
      // console.log("minFloorAskPrice", minFloorAskPrice);
      // console.log("maxFloorAskPrice", maxFloorAskPrice);
      // console.log("flagStatus", flagStatus);
      // console.log("sortBy", sortBy);
      // console.log("sortDirection", sortDirection);
      // console.log("currencies", currencies);
      // console.log("limit", limit);
      // console.log("includeTopBid", includeTopBid);
      // console.log("includeAttributes", includeAttributes);
      // console.log("includeQuantity", includeQuantity);
      // console.log("includeDynamicPricing", includeDynamicPricing);
      // console.log("includeLastSale", includeLastSale);
      // console.log("normalizeRoyalties", normalizeRoyalties);
      // console.log("continuation", continuation);
      // console.log("displayCurrency", displayCurrency);

      const response = await axios.get(`${hostedAPI}/tokens/v7`, {
        headers: {
          accept: "*/*",
          "x-api-key": reservoirAPI,
        },
        params: {
          collection: !tokens ? collection : null,
          collectionsSetId: collectionsSetId,
          community: community,
          contract: contract,
          tokenName: tokenName,
          tokens: tokens,
          tokenSetId: tokenSetId,
          attributes: attributes,
          source: source,
          nativeSource: nativeSource,
          minRarityRank: minRarityRank,
          maxRarityRank: maxRarityRank,
          minFloorAskPrice: minFloorAskPrice,
          maxFloorAskPrice: maxFloorAskPrice,
          flagStatus: flagStatus,
          sortBy: sortBy,
          sortDirection: sortDirection,
          currencies: currencies,
          limit: limit,
          includeTopBid: includeTopBid,
          includeAttributes: includeAttributes,
          includeQuantity: includeQuantity,
          includeDynamicPricing: includeDynamicPricing,
          includeLastSale: includeLastSale,
          normalizeRoyalties: normalizeRoyalties,
          continuation: continuation,
          displayCurrency: displayCurrency,
        },
      });
      const data = response.data;

      // console.log("Tokens: ", data.tokens);
      // console.log("Continuation: ", data.continuation);

      const nftCollectionTokens = {
        nfts: data.tokens,
        continuation: data.continuation,
      };
      return nftCollectionTokens;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async retrievePolygonTokens(
    collection: string,
  ) {
    try {
      let newData = {
        tokens: [],
        continuation: ""
      };

      const options = {
        method: 'GET',
        url: 'https://api-polygon.reservoir.tools/tokens/v7',
        params: {
          collection: collection,
          limit: '12'
        },
        headers: {accept: '*/*', 'x-api-key': reservoirAPI}
      };

      await axios
        .request(options)
        .then(function (response) {
          // console.log(response.data);
          newData = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });

      const nftCollectionTokens = {
        nfts: newData.tokens,
        continuation: newData.continuation,
      };
      return nftCollectionTokens;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Reservoir API - Tokens
   * Get a list of tokens with full metadata. This is useful for showing a single token page, or scenarios that require more metadata.
   * @param {String} collection Filter to a particular collection with collection-id. Example: 0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63
   * @returns {Promise<Object|Error>}
   */
  async retrieveUserTokens(account: string) {
    try {
      const response = await axios.get(
        `${hostedAPI}/users/${account}/tokens/v7`,
        {
          headers: {
            accept: "*/*",
            "x-api-key": reservoirAPI,
          },
          params: {
            includeTopBid: "true",
            includeAttributes: "true",
            includeLastSale: "true",
            includeRawData: "true",
          },
        }
      );
      const data = response.data;
      const usersTokens = [];
      usersTokens.push(...data.tokens);
      // console.log("Tokens: ", usersTokens);

      let continuation = data.continuation;
      // console.log("Continuation: ", continuation);

      while (continuation) {
        try {
          const response = await axios.get(
            `${hostedAPI}/users/${account}/tokens/v7`,
            {
              headers: {
                accept: "*/*",
                "x-api-key": reservoirAPI,
              },
              params: {
                continuation: continuation,
              },
            }
          );

          const data = response.data;
          usersTokens.push(...data.tokens);
          // console.log("Tokens push: ", usersTokens);
          continuation = data.continuation;
          // console.log("Continuation: ", continuation);
        } catch (error) {
          console.error(error);
          throw error;
        }
      }
      return usersTokens;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Reservoir API - Retrieve Single Token
   */
  async retrieveToken(
    collection: string,
    collectionsSetId?: string | null,
    community?: string | null,
    contract?: Array<string> | null,
    tokenName?: string | null,
    tokenId?: string | null,
    tokenSetId?: string | null,
    attributes?: object | null,
    source?: string | null,
    nativeSource?: string | null,
    minRarityRank?: string | null,
    maxRarityRank?: string | null,
    minFloorAskPrice?: string | null,
    maxFloorAskPrice?: string | null,
    flagStatus?: number | null,
    sortBy?: string | null,
    sortDirection?: string | null,
    currencies?: Array<string> | null,
    limit?: number | null,
    includeTopBid?: string | null,
    includeAttributes?: string | null,
    includeQuantity?: string | null,
    includeDynamicPricing?: string | null,
    includeLastSale?: string | null,
    normalizeRoyalties?: string | null,
    continuation?: string | null,
    displayCurrency?: string | null
  ) {
    try {
      // console.log("collection", collection);
      // console.log("collectionsSetId", collectionsSetId);
      // console.log("community", community);
      // console.log("contract", contract);
      // console.log("tokenName", tokenName);
      // console.log("Token Id", tokenId);
      // console.log("tokenSetId", tokenSetId);
      // console.log("attributes", attributes);
      // console.log("source", source);
      // console.log("nativeSource", nativeSource);
      // console.log("minRarityRank", minRarityRank);
      // console.log("maxRarityRank", maxRarityRank);
      // console.log("minFloorAskPrice", minFloorAskPrice);
      // console.log("maxFloorAskPrice", maxFloorAskPrice);
      // console.log("flagStatus", flagStatus);
      // console.log("sortBy", sortBy);
      // console.log("sortDirection", sortDirection);
      // console.log("currencies", currencies);
      // console.log("limit", limit);
      // console.log("includeTopBid", includeTopBid);
      // console.log("includeAttributes", includeAttributes);
      // console.log("includeQuantity", includeQuantity);
      // console.log("includeDynamicPricing", includeDynamicPricing);
      // console.log("includeLastSale", includeLastSale);
      // console.log("normalizeRoyalties", normalizeRoyalties);
      // console.log("continuation", continuation);
      // console.log("displayCurrency", displayCurrency);

      const response = await axios.get(`${hostedAPI}/tokens/v6`, {
        headers: {
          accept: "*/*",
          "x-api-key": reservoirAPI,
        },
        params: {
          collection: !tokenId ? collection : null,
          collectionsSetId: collectionsSetId,
          community: community,
          contract: contract,
          tokenName: tokenName,
          tokens: [`${collection}:${tokenId}`],
          tokenSetId: tokenSetId,
          attributes: attributes,
          source: source,
          nativeSource: nativeSource,
          minRarityRank: minRarityRank,
          maxRarityRank: maxRarityRank,
          minFloorAskPrice: minFloorAskPrice,
          maxFloorAskPrice: maxFloorAskPrice,
          flagStatus: flagStatus,
          sortBy: sortBy,
          sortDirection: sortDirection,
          currencies: currencies,
          limit: limit,
          includeTopBid: includeTopBid,
          includeAttributes: includeAttributes,
          includeQuantity: includeQuantity,
          includeDynamicPricing: includeDynamicPricing,
          includeLastSale: includeLastSale,
          normalizeRoyalties: normalizeRoyalties,
          continuation: continuation,
          displayCurrency: displayCurrency,
        },
      });
      const data = response.data;
      const nftToken = {
        nfts: data.tokens,
      };
      return nftToken;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Reservoir API - Search All Attributes by Contract Address
   * Use this API to see all possible attributes within a collection.
   * floorAskPrice for all attributes might not be returned on collections with more than 10k tokens.
   * Attributes are case sensitive.
   * @param {String} collection Filter to a particular collection with collection-id. Example: 0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63
   * @param {String} displayCurrency Return result in given currency
   * @returns {Promise<Array|Error>}
   */
  async retrieveAllAttributes(
    collection: string,
    displayCurrency?: string | null
  ) {
    try {
      const response = await axios.get(
        `${hostedAPI}/collections/${collection}/attributes/all/v4`,
        {
          headers: {
            accept: "application/json",
            "x-api-key": reservoirAPI,
          },
          params: {
            displayCurrency: displayCurrency ? displayCurrency : null,
          },
        }
      );
      const data = response.data;
      return data.attributes;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Reservoir API - Explore Attributes
   * Use this API to see stats on a specific attribute within a collection. This endpoint will return tokenCount, onSaleCount, sampleImages, and floorAskPrices by default.
   * floorAskPrices will not be returned on attributes with more than 10k tokens.
   * https://docs.reservoir.tools/reference/getcollectionscollectionattributesexplorev5
   * @param {String} collection Filter to a particular collection with collection-id. Example: 0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63
   * @param {String} contract Results will only include NFTs from this contract address.
   * @param {String} tokenId Filter to a particular token-id. Example: 1
   * @param {Boolean} includeTopBid If true, top bid will be returned in the response. defaults to false
   * @param {Boolean} excludeRangeTraits If true, range traits will be excluded from the response. defaults to false
   * @param {Boolean} excludeNumberTraits If true, number traits will be excluded from the response. defaults to false
   * @param {String} attributeKey Filter to a particular attribute key. Example: Composition
   * @param {Number} maxFloorAskPrices Max number of items returned in the response. defaults to 1
   * @param {Number} maxLastSells Max number of items returned in the response. defaults to 0
   * @param {String} continuation Use continuation token to request next offset of items.
   * @param {Number} limit Amount of items returned in response. Default limit is 20. Max limit is 5000. defaults to 20
   * @returns {Promise<String|Error>}
   */
  async exploreAttribute(
    collection: string,
    tokenId: string,
    includeTopBid?: boolean,
    excludeRangeTraits?: boolean,
    excludeNumberTraits?: boolean,
    attributeKey?: string,
    maxFloorAskPrices?: number,
    maxLastSells?: number,
    continuation?: string,
    limit?: number
  ) {
    try {
      const response = await axios.get(
        `${hostedAPI}/collections/${collection}/attributes/explore/v5`,
        {
          headers: {
            accept: "application/json",
            "x-api-key": reservoirAPI,
          },
          params: {
            tokenId: tokenId,
            includeTopBid: includeTopBid,
            excludeRangeTraits: excludeRangeTraits,
            excludeNumberTraits: excludeNumberTraits,
            attributeKey: attributeKey,
            maxFloorAskPrices: maxFloorAskPrices,
            maxLastSells: maxLastSells,
            continuation: continuation,
            limit: limit,
          },
        }
      );
      const data = response.data;
      console.log("Reservoir All Attributes Response Data: ", data);

      return data.attributes;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Reservoir API - Buy Now
   * Use this API to fill listings. We recommend using the SDK over this API as the SDK will iterate through the steps and return callbacks. Please mark excludeEOA as true to exclude Blur orders.
   * https://docs.reservoir.tools/reference/postexecutebuyv7
   * @param {String} collection Collection to buy
   * @param {String} tokenId Token to buy
   * @param {String} taker Address of wallet filling.
   * @returns {Promise<String|Error>}
   */
  async buyNow(collection: string, tokenId: string, account: string) {
    try {
      const response = await axios.get(`${hostedAPI}/execute/buy/v7`, {
        headers: {
          accept: "application/json",
          "x-api-key": reservoirAPI,
        },
        params: {
          collection: collection,
          token: tokenId,
          taker: account,
        },
      });
      const data = response.data;
      console.log("Reservoir All Attributes Response Data: ", data);

      return data.attributes;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Reservoir API - Buy Now
   * Use this API to fill listings. We recommend using the SDK over this API as the SDK will iterate through the steps and return callbacks. Please mark excludeEOA as true to exclude Blur orders.
   * https://docs.reservoir.tools/reference/postexecutebuyv7
   * @param {String} collection Collection to buy
   * @param {String} tokenId Token to buy
   * @param {String} taker Address of wallet filling.
   * @returns {Promise<String|Error>}
   */
  async makeOffer(collection: string, tokenId: string, account: string) {
    try {
      const response = await axios.get(`${hostedAPI}/execute/buy/v7`, {
        headers: {
          accept: "application/json",
          "x-api-key": reservoirAPI,
        },
        params: {
          collection: collection,
          token: tokenId,
          taker: account,
        },
      });
      const data = response.data;
      console.log("Reservoir All Attributes Response Data: ", data);

      return data.attributes;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

/**
 * Safety Check our NFT Image URL for IPFS references
 * @param {Array} attributes
 * @returns {String}
 **/
export const getUrlProtocol = (url: string) => {
  let protocol = url.endsWith("jpg") ? 5 : 0;

  if (protocol == 0) protocol = url.startsWith("http://") ? 1 : 0;
  if (protocol == 0) protocol = url.startsWith("https://") ? 2 : 0;
  if (protocol == 0) protocol = url.startsWith("ipfs://") ? 3 : 0;
  if (protocol == 0) protocol = url !== "" ? 4 : 0;

  switch (protocol) {
    case 1:
      return url;
    case 2:
      return url;
    case 3:
      return "https://ipfs.io/ipfs/" + url.substring(7);
    case 4:
      return url;
    case 5:
      return url;
    case 0:
      return "Not http or https";
  }
};

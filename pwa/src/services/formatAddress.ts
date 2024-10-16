export const formatAddress = (addr: string): string => {
  if (!addr) return "0x0...00";
  const upperAfterLastTwo = addr.slice(0, 2) + addr.slice(2);
  return `${upperAfterLastTwo.substring(0, 5)}...${upperAfterLastTwo.substring(39)}`;
}


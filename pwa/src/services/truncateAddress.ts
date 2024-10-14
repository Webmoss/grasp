export const truncateAddress = (data: string, num: number): string => {
  if (!data) return "";
  return data.slice(0, num);
}


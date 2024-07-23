export type paginationObject = {
  page: number;
  pageSize: number;
  sortSelect: string;
  sortBy: string;
  sortDirection: string;
  limit: number;
  continuation: string | null;
};

export const getInitialPagination = (): paginationObject => {
  return {
    page: 1,
    pageSize: 20,
    sortSelect: "price-low-high",
    sortBy: "floorAskPrice",
    sortDirection: "asc",
    limit: 20,
    continuation: null,
  };
};

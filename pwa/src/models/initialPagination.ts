import { paginationObject } from "src/models/pagination";

export const initialPagination = (): paginationObject => {
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

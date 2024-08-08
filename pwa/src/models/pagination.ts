export interface paginationObject {
  page: number;
  pageSize: number;
  sortSelect: string;
  sortBy: string;
  sortDirection: string;
  limit: number;
  continuation: string | null;
};


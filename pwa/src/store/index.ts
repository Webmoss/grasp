import { defineStore } from "pinia";
import { userObject } from 'src/models/user';
import { filterObject } from 'src/models/filter';
import { paginationObject } from 'src/models/pagination';

export const useStore = defineStore({
  id: "store",
  state: () => ({
    chainId: "",
    loggedIn: false,
    account: "",
    balance: "",
    user: <userObject>{},
    errorCode: 0,
    errorStatus: "",
    errorMessage: "",
    loading: false,
    approved: false,
    gridView: "grid",
    showFilter: true,
    filter: <filterObject>{},
    refreshFilter: {
      token_id: "" as string | undefined,
      search_term: "" as string | undefined,
      search_traits: [] as string[] | undefined,
      time_frame: "" as string | undefined,
      updated_at: "" as string | undefined,
      start_date: "" as string | undefined,
      end_date: "" as string | undefined,
      state: "" as string | undefined,
      dates: [] as string[] | undefined,
    },
    pagination: <paginationObject>{},
  }),
  getters: {
    getChainId(state) {
      return state.chainId;
    },
    getLoggedIn(state) {
      return state.loggedIn;
    },
    getAccount(state) {
      return state.account;
    },
    getBalance(state) {
      return state.balance;
    },
    getUser(state) {
      return state.user;
    },
    isErrorCode(state) {
      return state.errorCode;
    },
    isErrorStatus(state) {
      return state.errorStatus;
    },
    isErrorMessage(state) {
      return state.errorMessage;
    },
    isLoading(state) {
      return state.loading;
    },
    isApproved(state) {
      return state.approved;
    },
    getGridView(state) {
      return state.gridView;
    },
    getShowFilter(state) {
      return state.showFilter;
    },
    getFilter(state) {
      return state.filter as filterObject;
    },
    getPagination(state) {
      return state.pagination as paginationObject;
    },
    getPage(state) {
      return state.pagination.page;
    },
    getPageSize(state) {
      return state.pagination.pageSize;
    },
    getSortSelect(state) {
      return state.pagination.sortSelect;
    },
    getSortBy(state) {
      return state.pagination.sortBy;
    },
    getSortDirection(state) {
      return state.pagination.sortDirection;
    },
    getLimit(state) {
      return state.pagination.limit;
    },
    getContinuation(state) {
      return state.pagination.continuation;
    },
  },
  actions: {
    setChainId(chainId: string) {
      this.chainId = chainId;
    },
    setLoggedIn(loggedIn: boolean) {
      this.loggedIn = loggedIn;
    },
    setAccount(account: string) {
      this.account = account;
    },
    setBalance(balance: string) {
      this.balance = balance;
    },
    setUser(user: userObject) {
      this.user = user;
    },
    setErrorCode(value: number) {
      this.errorCode = value;
    },
    setErrorStatus(value: string) {
      this.errorStatus = value;
    },
    setErrorMessage(value: string) {
      this.errorMessage = value;
    },
    setLoading(value: boolean) {
      this.loading = value;
    },
    setApproved(value: boolean) {
      this.approved = value;
    },
    setGridView(view: string) {
      this.gridView = view;
    },
    setShowFilter(value: boolean) {
      this.showFilter = value;
    },
    setFilterValue<K extends keyof filterObject>(key: K, value: filterObject[K]) {
      this.filter[key] = value;
    },
    setSearchTerm(value: string) {
      this.filter.search_term = value;
    },
    setTokenId(value: string) {
      this.filter.token_id = value;
    },
    setSearchTraits(value: string) {
      const result = this.filter.search_traits.includes(value);
      if (!result) {
        /* Value not found in our Array, so add it */
        this.filter.search_traits.push(value);
      } else {
        /* Find and Remove item from the Array by Index */
        const index = this.filter.search_traits.indexOf(value);
        this.filter.search_traits.splice(index, 1);
      }
    },
    setPriceMinInput(value: string) {
      this.filter.price_min_input = value;
    },
    setPriceMaxInput(value: string) {
      this.filter.price_max_input = value;
    },
    setRarityMinInput(value: string) {
      this.filter.rarity_min_input = value;
    },
    setRarityMaxInput(value: string) {
      this.filter.rarity_max_input = value;
    },
    resetFilter() {
      this.filter = <filterObject>{};
      this.refreshFilter.token_id = "";
      this.refreshFilter.search_term = "";
      this.refreshFilter.search_traits = [];
      this.refreshFilter.time_frame = "";
      this.refreshFilter.updated_at = "";
      this.refreshFilter.start_date = "";
      this.refreshFilter.end_date = "";
      this.refreshFilter.state = "";
      this.refreshFilter.dates = ["", ""];
    },
    setPage(value: number) {
      this.pagination.page = value;
    },
    setPageSize(value: number) {
      this.pagination.pageSize = value;
    },
    setSortSelect(value: string) {
      this.pagination.sortSelect = value;
    },
    setSortBy(value: string) {
      this.pagination.sortBy = value;
    },
    setSortDirection(value: string) {
      this.pagination.sortDirection = value;
    },
    setLimit(value: number) {
      this.pagination.limit = value;
    },
    setContinuation(value: string) {
      this.pagination.continuation = value;
    },
    resetPagination() {
      this.pagination = <paginationObject>{};
    },
  },
});

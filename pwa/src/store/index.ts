import { defineStore } from "pinia";
import { userObject } from 'src/models/user';
import { courseObject } from "src/models/course";
import { lessonObject } from "src/models/lesson";
import { creatorObject } from "src/models/creator";
import { metadataObject } from "src/models/metadata";
import { Filter } from 'src/models/filter';
import { getBlankFilter } from '@/models/getBlankFilter';
import { paginationObject } from 'src/models/pagination';
import { initialPagination } from '@/models/initialPagination';

export const useStore = defineStore({
  id: "store",
  state: () => ({
    chainId: "",
    loggedIn: false,
    account: "",
    balance: "",
    user: <userObject>{},
    eduUsername: "",
    eduEthAddress: "",
    ocid: "",
    ocConnected: false,
    ocAccessToken: "",
    errorCode: 0,
    errorStatus: "",
    errorMessage: "",
    loading: false,
    approved: false,
    searchChainId: "all",
    searchContract: "",
    searchName: "",
    searchImage: "",
    searchResults: [] as metadataObject[],
    gridView: "grid",
    showFilter: true,
    refreshFilter: {
      token_id: "" as string | undefined,
      search_term: "" as string | undefined,
      search_traits: [] as string[] | undefined,
      time_frame: "" as string | undefined,
      updated_date: "" as string | undefined,
      start_date: "" as string | undefined,
      end_date: "" as string | undefined,
      state: "" as string | undefined,
      dates: [] as string[] | undefined,
    },
    filter: getBlankFilter() as Filter,
    pagination: initialPagination() as paginationObject,
    courses: [] as courseObject[],
    course: <courseObject>{},
    lessons: [] as lessonObject[],
    lesson: <lessonObject>{},
    creators: [] as creatorObject[],
    creator: <creatorObject>{},
    marketplace: [] as metadataObject[],
    nfts: [] as metadataObject[],
    nft: <metadataObject>{},
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
    getEduUsername(state) {
      return state.eduUsername;
    },
    getEduEthAddress(state) {
      return state.eduEthAddress;
    },
    getOcid(state) {
      return state.ocid;
    },
    getOcConnected(state) {
      return state.ocConnected;
    },
    getOcAccessToken(state) {
      return state.ocAccessToken;
    },
    getErrorCode(state) {
      return state.errorCode;
    },
    getErrorStatus(state) {
      return state.errorStatus;
    },
    getErrorMessage(state) {
      return state.errorMessage;
    },
    isLoading(state) {
      return state.loading;
    },
    isApproved(state) {
      return state.approved;
    },
    getSearchChainId(state) {
      return state.searchChainId;
    },
    getSearchContract(state) {
      return state.searchContract;
    },
    getSearchName(state) {
      return state.searchName;
    },
    getSearchImage(state) {
      return state.searchImage;
    },
    getSearchResults(state) {
      return state.searchResults;
    },
    getGridView(state) {
      return state.gridView;
    },
    getShowFilter(state) {
      return state.showFilter;
    },
    getFilter(state) {
      return state.filter as Filter;
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
    getCourses(state) {
      return state.courses;
    },
    getLessons(state) {
      return state.lessons;
    },
    getCreators(state) {
      return state.creators;
    },
    getMarketplace(state) {
      return state.marketplace;
    },
    getNfts(state) {
      return state.nfts;
    },
    getCourse(state) {
      return state.course;
    },
    getLesson(state) {
      return state.lesson;
    },
    getCreator(state) {
      return state.creator;
    },
    getNft(state) {
      return state.nft;
    },
  },
  actions: {
    setChainId(chainId: string) {
      this.chainId = chainId;
    },
    setLoggedIn(value: boolean) {
      this.loggedIn = value;
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
    setEduUsername(value: string) {
      this.eduUsername = value;
    },
    setEduEthAddress(value: string) {
      this.eduEthAddress = value;
    },
    setOcid(value: string) {
      this.ocid = value;
    },
    setOcConnected(value: boolean) {
      this.ocConnected = value;
    },
    setOcAccessToken(value: string) {
      this.ocAccessToken = value;
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
    updateSearchChainId(searchChainId: string) {
      this.searchChainId = searchChainId;
    },
    updateSearchContract(searchContract: string) {
      this.searchContract = searchContract;
    },
    updateSearchName(searchName: string) {
      this.searchName = searchName;
    },
    updateSearchImage(searchImage: string) {
      this.searchImage = searchImage;
    },
    addSearchResults(tokens: metadataObject[]) {
      this.searchResults = tokens;
    },
    clearSearchResults() {
      this.searchChainId = "all";
      this.searchContract = "";
      this.searchName = "";
      this.searchImage = "";
      this.searchResults = [];
    },
    setGridView(view: string) {
      this.gridView = view;
    },
    setShowFilter(value: boolean) {
      this.showFilter = value;
    },
    setFilterValue<K extends keyof Filter>(key: K, value: Filter[K]) {
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
      this.filter = <Filter>getBlankFilter();
      this.refreshFilter.token_id = "";
      this.refreshFilter.search_term = "";
      this.refreshFilter.search_traits = [];
      this.refreshFilter.time_frame = "";
      this.refreshFilter.updated_date = "";
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
      this.pagination = <paginationObject>initialPagination();
    },
    setCourses(courses: courseObject[]) {
      this.courses = courses;
    },
    setLessons(lessons: lessonObject[]) {
      this.lessons = lessons;
    },
    setCreators(creators: creatorObject[]) {
      this.creators = creators;
    },
    setNfts(nfts: metadataObject[]) {
      this.nfts = nfts;
    },
    setMarketplace(nfts: metadataObject[]) {
      this.marketplace = nfts;
    },
    setCourse(course: courseObject) {
      this.course = course;
    },
    setLesson(lesson: lessonObject) {
      this.lesson = lesson;
    },
    setCreator(creator: creatorObject) {
      this.creator = creator;
    },
    setNft(nft: metadataObject) {
      this.nft = nft;
    },
  },
});

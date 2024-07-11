import { defineStore } from "pinia";

export const useStore = defineStore({
  id: "store",
  state: () => ({
    chainId: "",
    account: "",
    balance: "",
    errorCode: 0,
    errorStatus: "",
    errorMessage: "",
    loading: false,
    approved: false,
  }),
  getters: {
    getChainId(state) {
      return state.chainId;
    },
    getAccount(state) {
      return state.account;
    },
    getBalance(state) {
      return state.balance;
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
  },
  actions: {
    setChainId(chainId: string) {
      this.chainId = chainId;
    },
    updateAccount(account: string) {
      this.account = account;
    },
    updateBalance(balance: string) {
      this.balance = balance;
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
  },
});

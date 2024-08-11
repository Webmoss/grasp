export {};

declare global {
  interface Window {
    ethereum?: any;
  }
  interface OCAuthSandbox {
    redirect: string;
  }
  interface Contracts {
    methods: any;
    setProvider: any;
  }
}

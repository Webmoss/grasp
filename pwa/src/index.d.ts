export {};

declare global {
  interface Window {
    ethereum: any;
  }
  interface OCAuthSandbox {
    redirect: string;
  }
}

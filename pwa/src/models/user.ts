export interface userObject {
  campusId: string | null | undefined;
  appState: string | null | undefined;
  email: string | null | undefined;
  name: string | null | undefined;
  profileImage: string | null | undefined;
  aggregateVerifier: string | null | undefined;
  typeOfLogin: string | null | undefined;
  verifier: string | null | undefined;
  verifierId: string | null | undefined;
  dappShare: string | null | undefined;
  oAuthIdToken: string | number | null;
  oAuthAccessToken: string | number | null;
  idToken: string | number | null;
  isMfaEnabled: boolean;
}

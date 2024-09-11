export interface userObject {
  id: string | null | undefined;
  orgId: string | null | undefined;
  campusId: string | null | undefined;
  name: string | null | undefined;
  email: string | null | undefined;
  city: string | number | null;
  country: string | number | null;
  bannerImage: string | null | undefined;
  profileImage: string | null | undefined;
  created_at: string | null | undefined;
  updated_at: string | null | undefined;

  appState: string | null | undefined;
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

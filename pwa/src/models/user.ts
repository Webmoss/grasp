import { linkObject } from "./link";
export interface userObject {
  id: string | null | undefined;
  role: string | null | undefined;
  orgId: string | null | undefined;
  orgName: string | null | undefined;
  campusId: string | null | undefined;
  wallet: string | null | undefined;
  type: string;
  banner: string;
  image: string;
  title: string | null;
  name: string | null | undefined;
  description: string | null;
  username: string | null | undefined;
  email: string | null | undefined;
  phone: string | null | undefined;
  city: string | null | undefined;
  country: string | null | undefined;
  website: linkObject;
  twitter: linkObject;
  discord: linkObject;
  telegram: linkObject;
  linkedin: linkObject;
  created_date: string | null | undefined;
  updated_date: string | null | undefined;
  enabled: boolean;
  verified: boolean;
  blocked: boolean;
  /* Web3 Auth Values */
  profileImage: string;
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

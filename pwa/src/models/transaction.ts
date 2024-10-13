import { lastSaleObject } from "src/models/lastSale";

export interface transactionObject {
  id: string;
  date: string | null | undefined;
  userId: string | null | undefined;
  userName: string | null | undefined;
  campusId: string | null | undefined;
  orgId: string | null | undefined;
  orgName: string | null | undefined;
  courseId: string | null | undefined;
  courseTitle: string | null | undefined;
  lessonId: string | null | undefined;
  lessonTitle: string | null | undefined;
  nftId: string | null | undefined;
  nftTitle: string | null | undefined;
  fromWallet: string | null | undefined;
  toWallet: string | null | undefined;
  lastSale: lastSaleObject | null;
  price: number;
  discount: number;
  fromDate: string;
  toDate: string;
  transactionType: 'purchase' | 'transfer' | 'mint'; // To specify the type of transaction
  status: 'pending' | 'completed' | 'failed';        // To track the transaction status
  createdAt: string;                                 // Timestamp for when the transaction was created
  updatedAt: string;
}

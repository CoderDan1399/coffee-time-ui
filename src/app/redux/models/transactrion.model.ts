export interface Transaction {
  id: string;
  teamId;
  string;
  purchaserName: string;
  purchaserUserId: string;
  datePurchased: Date;
  items: TransactionItem[];
}

export interface TransactionItem {
  id: string;
  transactionId: string;
  userId: string;
  username: string;
  qty: number;
}

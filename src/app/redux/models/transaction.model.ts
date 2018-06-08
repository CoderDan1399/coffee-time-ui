export interface TransactionHeader {
  teamId: string;
  id: number;
  purchaserUserId: string;
  addedByUserId: string;
  items: TransactionItem[];
}

export interface TransactionItem {
  userId: string;
  qty: number;
}

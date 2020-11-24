export interface TransactionItem {
  date: Date;
  description: string;
  amount: number;
  pending?: boolean;
}

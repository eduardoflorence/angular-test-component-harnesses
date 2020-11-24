import { TransactionItem } from 'src/app/uilib/models/transaction-item.model';

export const MOCK_TRANSACTION_LIST: TransactionItem[] = [
  {
    amount: 50,
    description: 'Legend of Zelda',
    date: new Date('2/10/2020'),
  },
  {
    amount: 39.99,
    description: 'Mario Cart',
    date: new Date('2/10/2020'),
    pending: true
  },
  {
    amount: 59.99,
    description: 'Pro Controller',
    date: new Date('1/9/2020')
  }
];

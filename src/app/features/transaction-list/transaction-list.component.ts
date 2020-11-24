import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TransactionItem } from 'src/app/uilib/models/transaction-item.model';
import { MOCK_TRANSACTION_LIST } from '../models/mock/transaction-list.mock';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {

  transactionItems: TransactionItem[];
  filterStatus =  new FormControl('all');

  ngOnInit(): void {
    this.transactionItems = [...MOCK_TRANSACTION_LIST];
    this.changeStatus();
  }

  changeStatus(): void {
    switch (this.filterStatus.value) {
      case 'pending':
        this.transactionItems = [...MOCK_TRANSACTION_LIST].filter(item => item.pending);
        break;
      case 'complete':
        this.transactionItems = [...MOCK_TRANSACTION_LIST].filter(item => !item.pending);
        break;
      default:
        this.transactionItems = [...MOCK_TRANSACTION_LIST];
    }
  }

  viewTransaction(item: TransactionItem): void {
    alert(`Transaction viewed: ${JSON.stringify(item)}`);
  }
}

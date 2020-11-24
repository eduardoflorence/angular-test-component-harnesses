import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TransactionItem } from '../models/transaction-item.model';

@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.scss']
})
export class TransactionItemComponent {
  @Input() item: TransactionItem;
  @Output() clickViewTransaction = new EventEmitter<TransactionItem>();

  viewTransaction(): void {
    if (!this.item.pending) {
      this.clickViewTransaction.emit(this.item);
    }
  }

}

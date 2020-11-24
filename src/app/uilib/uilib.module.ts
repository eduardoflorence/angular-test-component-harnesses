import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionItemComponent } from './transaction-item/transaction-item.component';



@NgModule({
  declarations: [TransactionItemComponent],
  imports: [
    CommonModule
  ],
  exports: [
    TransactionItemComponent
  ]
})
export class UilibModule { }

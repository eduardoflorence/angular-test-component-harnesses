import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { UilibModule } from '../uilib/uilib.module';
import { FeaturesRoutingModule } from './features-routing.module';

@NgModule({
  declarations: [TransactionListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UilibModule,
    MatRadioModule,
    FeaturesRoutingModule
  ]
})
export class FeaturesModule { }

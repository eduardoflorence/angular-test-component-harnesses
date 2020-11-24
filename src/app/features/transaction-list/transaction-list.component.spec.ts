import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { By } from '@angular/platform-browser';

import { TransactionItemComponent } from 'src/app/uilib/transaction-item/transaction-item.component';
import { TransactionItemHarness } from 'src/app/uilib/transaction-item/transaction-item.component.harness';

import { FeaturesModule } from '../features.module';
import { TransactionListComponent } from './transaction-list.component';
import { MOCK_TRANSACTION_LIST } from '../models/mock/transaction-list.mock';

import { MatRadioButtonHarness } from '@angular/material/radio/testing';

describe('Testando TransactionListComponent', () => {
  let component: TransactionListComponent;
  let fixture: ComponentFixture<TransactionListComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturesModule],
      declarations: [ TransactionListComponent, TransactionItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionListComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('Deve chamar viewTransaction no clique em View Transaction', async () => {
    fixture.detectChanges();
    spyOn(component, 'viewTransaction');

    /* const transactionItemEls = fixture.debugElement.queryAll(By.css('app-transaction-item'));
    const firstTransaction = transactionItemEls[0];
    const viewTransactionButton = firstTransaction.query(By.css('button'));
    viewTransactionButton.triggerEventHandler('click', {});
    fixture.detectChanges(); */

    const transactionItemHarness = await loader.getHarness(TransactionItemHarness);
    await transactionItemHarness.clickViewTransactionButton();

    expect(component.viewTransaction).toHaveBeenCalledWith(MOCK_TRANSACTION_LIST[0]);
  });

  it('Não deve chamar viewTransaction na primeira transação pendente', async () => {
    fixture.detectChanges();
    spyOn(component, 'viewTransaction');

    /* const transactionItemEls = fixture.debugElement.queryAll(By.css('app-transaction-item'))
      .filter(el => !!el.query(By.css('button[disabled]')));

    expect(transactionItemEls.length).toEqual(1);

    const firstDisabledTransaction = transactionItemEls[0];
    const viewTransactionButton = firstDisabledTransaction.query(By.css('button'));
    viewTransactionButton.triggerEventHandler('click', {});

    fixture.detectChanges(); */
    const transactionItemHarness = await loader.getHarness(TransactionItemHarness.with({
      transactionPending: true
    }));
    await transactionItemHarness.clickViewTransactionButton();

    expect(component.viewTransaction).not.toHaveBeenCalled();
  });

  it('Deve chamar viewTransaction com transação de $59.99', async () => {
    fixture.detectChanges();
    spyOn(component, 'viewTransaction');

    const transactionItemHarness = await loader.getHarness(TransactionItemHarness.with({
      itemAmount: '$59.99'
    }));

    await transactionItemHarness.clickViewTransactionButton();

    expect(component.viewTransaction).toHaveBeenCalledWith(MOCK_TRANSACTION_LIST[2]);
  });

  it('Deve mostrar a lista de transações completas', async () => {
    /* fixture.detectChanges();
    const completeFilter = fixture.debugElement.query(By.css('#completeFilter'));
    const clickableElement = completeFilter.query(By.css('.mat-radio-container'));

    clickableElement.nativeElement.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const transactionItems = fixture.debugElement.queryAll(By.css('app-transaction-item'));
      expect(transactionItems.length).toBe(2);
      done();
    }); */

    const completeFilter = await loader.getHarness(MatRadioButtonHarness.with({
      label: 'Completas'
    }));
    await completeFilter.check();
    const transactionItems = await loader.getAllHarnesses(TransactionItemHarness);
    console.log(transactionItems.length);
    expect(transactionItems.length).toBe(2);

  });
});

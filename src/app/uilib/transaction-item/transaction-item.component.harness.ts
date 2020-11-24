import { ComponentHarness, BaseHarnessFilters, HarnessPredicate } from '@angular/cdk/testing';

interface TransactionItemHarnessFilters extends BaseHarnessFilters{
  itemAmount?: string;
  transactionPending?: boolean;
}

export class TransactionItemHarness extends ComponentHarness {
  static hostSelector = 'app-transaction-item';

  protected viewTransactionButton =  this.locatorFor('button');
  protected itemAmount = this.locatorFor('.amount');

  static with(options: TransactionItemHarnessFilters): HarnessPredicate<TransactionItemHarness> {
    const predicates = new HarnessPredicate(TransactionItemHarness, options);
    predicates.addOption(
      'Transaction pending',
      options.transactionPending,
      (harness, pending) =>
        harness.isViewTransactionBtnDisabled().then(buttonDisabled => buttonDisabled === pending)
    );
    predicates.addOption(
      'Item amount',
      options.itemAmount,
      (harness, amount) =>
        HarnessPredicate.stringMatches(harness.getItemAmount(), amount)
    );
    return predicates;
  }

  async clickViewTransactionButton(): Promise<any> {
    const transactionButton = await this.viewTransactionButton();
    return transactionButton.click();
  }

  async isViewTransactionBtnDisabled(): Promise<boolean> {
    const viewTransactionButton = await this.viewTransactionButton();
    return viewTransactionButton.matchesSelector('[disabled]');
  }

  async getItemAmount(): Promise<string> {
    const itemAmountElem = await this.itemAmount();
    return itemAmountElem.text();
  }
}

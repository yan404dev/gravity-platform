import { AsyncLocalStorage } from 'async_hooks';
import { ManualTransaction } from './manual-transaction';
import { TransactionOptions } from '../decorators';

type TransactionStorageDataType = {
  manualTx: ManualTransaction | null;
  options: TransactionOptions;
};

class LocalStorage<T> {
  private readonly als: AsyncLocalStorage<T>;
  constructor() {
    this.als = new AsyncLocalStorage();

    if (!this.als) {
      throw new Error(
        `Cannot create transaction storage because no AsyncLocalStorage from async_hooks.`,
      );
    }
  }

  protected run<R = any>(
    store: T,
    callback: () => R | Promise<R>,
  ): R | Promise<R> {
    return this.als.run(store, callback);
  }

  protected get(): T {
    return this.als.getStore() || ({} as T);
  }

  protected set(key: keyof T, value: any): void {
    const store = this.get();
    if (store !== null && store !== undefined) store[key] = value;
  }
}

class TransactionStorage extends LocalStorage<TransactionStorageDataType> {
  async initTx<R = any>(
    options: TransactionOptions,
    callback: () => Promise<R>,
  ): Promise<R> {
    return this.run({ manualTx: null, options }, callback) as Promise<R>;
  }

  getTx(): TransactionStorageDataType | null {
    const store = this.get();
    return store && Object.keys(store).length > 0 ? store : null;
  }

  setTx(value: ManualTransaction): void {
    const store = this.get();
    if (store !== null && store !== undefined) {
      store.manualTx = value;
    } else {
      throw new Error('TransactionStorage is not initialized.');
    }
  }
}

export default new TransactionStorage();

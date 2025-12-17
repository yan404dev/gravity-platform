import { TransactionOptions } from '../decorators';
import { ManualTransaction } from './manual-transaction';

export async function extractTransaction(
  prisma,
  options: TransactionOptions,
): Promise<ManualTransaction> {
  let waiter;
  const instance = await new Promise<ManualTransaction>((resolveInstance) => {
    waiter = prisma.$transaction(async (tx) => {
      const transaction = new ManualTransaction(tx);
      resolveInstance(transaction);
      await new Promise<void>((resolve, reject) =>
        transaction.setTransaction(
          () => resolve(),
          // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
          (error: any) => reject(error),
        ),
      );
    }, options);
  });
  instance.setWaiter(waiter);

  return instance;
}

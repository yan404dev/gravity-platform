import { Prisma } from '@prisma/client';
import transactionStorage from '../utils/transaction.storage';
import { extractTransaction } from '../utils/extract-transaction';
import { TransactionOptions } from '../decorators';

export const createTransactionExtension = (options?: TransactionOptions) =>
  Prisma.defineExtension((prisma) => {
    return prisma.$extends({
      query: {
        $allOperations: async ({
          args,
          model,
          operation,
          query,
          __internalParams,
        }: any) => {
          const store = transactionStorage.getTx();

          if (!store || store === null || __internalParams?.transaction) {
            return query(args);
          }

          if (store.manualTx === null) {
            const manualTx = await extractTransaction(
              prisma,
              store.options || options,
            );
            transactionStorage.setTx(manualTx);
          }

          const updatedStore = transactionStorage.getTx();

          if (!updatedStore) {
            throw new Error('Transaction storage is not properly initialized.');
          }

          if (model) {
            if (!updatedStore.manualTx || !updatedStore.manualTx.client) {
              throw new Error(
                'Manual transaction client is not set. Ensure that the transaction is initialized correctly.',
              );
            }
            if (!updatedStore.manualTx.client[model]) {
              throw new Error(
                `Model ${model} does not exist in the transaction client.`,
              );
            }
            const result =
              await updatedStore.manualTx.client[model][operation](args);

            return result;
          }

          if (!updatedStore.manualTx) {
            throw new Error('Manual transaction is not set.');
          }

          return (updatedStore.manualTx as any).client[operation](args);
        },
      },
    });
  });

/**
 * Interface para representar uma query construída pelo QueryBuilder
 */
export interface QueryBuilderEntity {
  where?: Record<string, any>;
  skip?: number;
  take?: number;
  orderBy?: Record<string, any>;
}

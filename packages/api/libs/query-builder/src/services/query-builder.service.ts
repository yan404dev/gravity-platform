import { Injectable, Logger } from '@nestjs/common';
import { QueryBuilderEntity } from '../entities';

/**
 * Tipos para melhor tipagem do QueryBuilder
 */
type NestedObject = Record<string, any>;

/**
 * Interface para operadores de query suportados
 */
interface QueryOperator {
  [key: string]: any;
}

/**
 * QueryBuilder - Utilitário para construção de queries dinâmicas
 *
 * Permite construir queries com condições, paginação, ordenação e filtros de data
 * de forma fluente e type-safe.
 */
@Injectable()
export class QueryBuilderService {
  private readonly logger = new Logger(QueryBuilderService.name);
  public query: QueryBuilderEntity;

  constructor() {
    this.reset();
  }

  /**
   * Reseta o estado da query para começar uma nova consulta
   */
  private reset(): this {
    this.query = {
      where: {
        deletedAt: null,
      },
    };
    return this;
  }

  /**
   * Configura paginação na query
   * @param page - Número da página (começando em 1)
   * @param perPage - Tamanho da página
   */
  pagination(page: number, perPage: number): this {
    if (page < 1 || perPage < 1) {
      this.logger.warn('Invalid pagination parameters', { page, perPage });
      return this;
    }

    const skip = (page - 1) * perPage;
    this.query.skip = skip;
    this.query.take = perPage;

    return this;
  }

  /**
   * Adiciona condições à query baseado em um objeto de condições
   * @param conditions - Objeto com as condições a serem aplicadas
   */
  condition<T>(conditions: T): this {
    if (!conditions || typeof conditions !== 'object') {
      return this;
    }

    try {
      Object.entries(conditions).forEach(([field, value]) => {
        if (this.isEmptyValue(value)) return;

        this.processCondition(field, value);
      });
    } catch (error) {
      this.logger.error('Error processing conditions', { error, conditions });
    }

    return this;
  }

  /**
   * Adiciona filtro de data com range (de/até)
   * @param field - Campo de data
   * @param from - Data inicial (opcional)
   * @param to - Data final (opcional)
   */
  date(field: string, from?: string | Date, to?: string | Date): this {
    // Reset para começar uma nova query
    this.reset();
    if (!field) {
      this.logger.warn('Field is required for date filter');
      return this;
    }

    try {
      const dateFilter: QueryOperator = {};

      if (from) {
        dateFilter.gte = new Date(from);
      }

      if (to) {
        dateFilter.lte = new Date(to);
      }

      if (Object.keys(dateFilter).length > 0) {
        this.setNestedField(field, dateFilter);
      }
    } catch (error) {
      this.logger.error('Error processing date filter', {
        error,
        field,
        from,
        to,
      });
    }

    return this;
  }

  /**
   * Configura ordenação da query
   * @param orderBy - String no formato "campo,direção" (ex: "name,asc")
   */
  sort(orderBy?: string): this {
    if (!orderBy) return this;

    try {
      const [field, direction] = orderBy.split(',');

      if (!field || !direction) {
        this.logger.warn('Invalid sort format. Expected: "field,direction"', {
          orderBy,
        });
        return this;
      }

      const sortOrder = direction.toLowerCase() as 'asc' | 'desc';
      if (!['asc', 'desc'].includes(sortOrder)) {
        this.logger.warn('Invalid sort direction. Use "asc" or "desc"', {
          direction,
        });
        return this;
      }

      const nestedOrder = this.createNestedObject(field.split('.'), sortOrder);
      (this.query as any).orderBy = nestedOrder;
    } catch (error) {
      this.logger.error('Error processing sort', { error, orderBy });
    }

    return this;
  }

  /**
   * Verifica se um valor é considerado vazio para filtros
   */
  private isEmptyValue(value: any): boolean {
    return (
      value === null ||
      value === undefined ||
      value === '' ||
      (Array.isArray(value) && value.length === 0)
    );
  }

  /**
   * Processa uma condição individual
   */
  private processCondition(field: string, value: any): void {
    if (typeof value !== 'string') {
      this.setNestedField(field, value);
      return;
    }

    if (value.includes(',')) {
      const [searchValue, operator] = value.split(',', 2);

      if (!searchValue || !operator) {
        this.logger.warn('Invalid condition format', { field, value });
        return;
      }

      this.setNestedField(field, { [operator]: searchValue });
    } else {
      this.setNestedField(field, value);
    }
  }

  /**
   * Define valor em campo aninhado (suporta notação de ponto)
   */
  private setNestedField(field: string, value: any): void {
    if (!this.query.where) {
      this.query.where = {};
    }

    if (!field.includes('.')) {
      this.query.where[field] = value;
      return;
    }

    const fields = field.split('.');
    const lastField = fields.pop()!;
    let current = this.query.where;

    for (const nestedField of fields) {
      if (!current || typeof current !== 'object') {
        return;
      }

      if (!current[nestedField] || typeof current[nestedField] !== 'object') {
        current[nestedField] = {};
      }
      current = current[nestedField];
    }

    if (current && typeof current === 'object') {
      current[lastField] = value;
    }
  }

  /**
   * Cria objeto aninhado a partir de array de campos
   */
  private createNestedObject(fields: string[], value: any): NestedObject {
    return fields.reduceRight((acc, field) => ({ [field]: acc }), value);
  }
}

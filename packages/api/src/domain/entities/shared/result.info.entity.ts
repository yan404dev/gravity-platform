import { ApiProperty } from '@nestjs/swagger';

/**
 * Entidade com informações de paginação.
 * Utilizada em consultas paginadas para fornecer metadados sobre os resultados.
 */
export class ResultInfoEntity {
  @ApiProperty({
    description: 'Número total de registros encontrados',
    example: 150,
  })
  total: number;

  @ApiProperty({
    description: 'Página atual (baseada em 1)',
    example: 1,
    minimum: 1,
  })
  page: number;

  @ApiProperty({
    description: 'Número total de páginas',
    example: 15,
    minimum: 1,
  })
  pages: number;

  @ApiProperty({
    description: 'Número de registros por página',
    example: 10,
    minimum: 1,
  })
  perPage: number;
}

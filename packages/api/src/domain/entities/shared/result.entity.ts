import { ApiProperty } from '@nestjs/swagger';
import { ResultInfoEntity } from './result.info.entity';

/**
 * Entidade genérica para respostas paginadas.
 * Contém os dados e informações de paginação.
 */
export class ResultEntity<T> {
  @ApiProperty({
    description: 'Array de dados da consulta',
    isArray: true,
  })
  data: T[];

  @ApiProperty({
    description: 'Informações de paginação',
    type: () => ResultInfoEntity,
  })
  info: ResultInfoEntity;
}

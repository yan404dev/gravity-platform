import { Type } from 'class-transformer';
import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';
import { IsSort } from 'src/common/validators';

export class QueryParamsDto {
  @IsInt({ message: 'O número da página deve ser um valor numérico válido' })
  @Type(() => Number)
  @IsOptional()
  page: number = 1;

  @IsInt({ message: 'O tamanho da página deve ser um valor numérico válido' })
  @Type(() => Number)
  @IsOptional()
  perPage: number = 10;

  @IsString({ message: 'O campo de busca deve ser uma string válida' })
  @IsOptional()
  search?: string;

  @IsString({ message: 'O campo de ordenação deve ser uma string válida' })
  @IsOptional()
  @IsSort({
    message:
      'O formato de ordenação deve ser "campo,direção" onde direção é "asc" ou "desc"',
  })
  orderBy?: string;

  @IsOptional()
  @IsDate({ message: 'A data inicial deve estar em formato de data válido' })
  @Type(() => Date)
  dataInicio?: Date;

  @IsOptional()
  @IsDate({ message: 'A data final deve estar em formato de data válido' })
  @Type(() => Date)
  dataFim?: Date;
}

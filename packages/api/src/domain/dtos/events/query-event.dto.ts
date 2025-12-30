import { $Enums } from '@prisma/client';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { QueryParamsDto } from '../shared';

export class QueryEventDto extends QueryParamsDto {
  @IsOptional()
  @IsEnum($Enums.EventStatus, {
    message: 'O status deve ser DRAFT, PUBLISHED, CANCELLED ou COMPLETED',
  })
  status?: $Enums.EventStatus;

  @IsOptional()
  @IsEnum($Enums.EventPrivacy, {
    message: 'A privacidade deve ser PUBLIC ou PRIVATE',
  })
  privacy?: $Enums.EventPrivacy;

  @IsOptional()
  @IsString({ message: 'A categoria deve ser uma string válida' })
  category?: string;

  @IsOptional()
  @IsString({ message: 'A cidade deve ser uma string válida' })
  city?: string;

  @IsOptional()
  @IsDate({ message: 'A data inicial deve estar em formato válido' })
  @Type(() => Date)
  startDateFrom?: Date;

  @IsOptional()
  @IsDate({ message: 'A data final deve estar em formato válido' })
  @Type(() => Date)
  startDateTo?: Date;

  @IsOptional()
  @IsDate({ message: 'A data inicial deve estar em formato válido' })
  @Type(() => Date)
  endDateFrom?: Date;

  @IsOptional()
  @IsDate({ message: 'A data final deve estar em formato válido' })
  @Type(() => Date)
  endDateTo?: Date;
}

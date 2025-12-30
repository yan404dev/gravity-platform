import { $Enums } from '@prisma/client';
import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateEventDto {
  @IsOptional()
  @IsNotEmpty({ message: 'O título é obrigatório' })
  @IsString({ message: 'O título deve ser uma string válida' })
  title?: string;

  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string válida' })
  description?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'A data de início é obrigatória' })
  @IsDateString(
    {},
    { message: 'A data de início deve estar em formato válido' },
  )
  startDate?: Date;

  @IsOptional()
  @IsNotEmpty({ message: 'A data de término é obrigatória' })
  @IsDateString(
    {},
    { message: 'A data de término deve estar em formato válido' },
  )
  endDate?: Date;

  @IsOptional()
  @IsString({ message: 'A categoria deve ser uma string válida' })
  category?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'A privacidade é obrigatória' })
  @IsEnum($Enums.EventPrivacy, {
    message: 'A privacidade deve ser PUBLIC ou PRIVATE',
  })
  privacy?: $Enums.EventPrivacy;

  @IsOptional()
  @IsNotEmpty({ message: 'A latitude é obrigatória' })
  @IsNumber({}, { message: 'A latitude deve ser um número válido' })
  @Min(-90, { message: 'A latitude deve estar entre -90 e 90' })
  @Max(90, { message: 'A latitude deve estar entre -90 e 90' })
  latitude?: number;

  @IsOptional()
  @IsNotEmpty({ message: 'A longitude é obrigatória' })
  @IsNumber({}, { message: 'A longitude deve ser um número válido' })
  @Min(-180, { message: 'A longitude deve estar entre -180 e 180' })
  @Max(180, { message: 'A longitude deve estar entre -180 e 180' })
  longitude?: number;

  @IsOptional()
  @IsEnum($Enums.EventStatus, {
    message: 'O status deve ser DRAFT, PUBLISHED, CANCELLED ou COMPLETED',
  })
  status?: $Enums.EventStatus;

  @IsOptional()
  @IsString({ message: 'A URL da thumbnail deve ser uma string válida' })
  thumbnailUrl?: string;

  @IsOptional()
  @IsString({ message: 'A URL do banner deve ser uma string válida' })
  bannerUrl?: string;

  @IsOptional()
  @IsArray({ message: 'As tags devem ser um array de strings' })
  @ArrayNotEmpty({ message: 'O array de tags não pode estar vazio' })
  @IsString({ each: true, message: 'Cada tag deve ser uma string válida' })
  tags?: string[];

  @IsOptional()
  @IsNotEmpty({ message: 'O timezone é obrigatório' })
  @IsString({ message: 'O timezone deve ser uma string válida' })
  timezone?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'A cidade é obrigatória' })
  @IsString({ message: 'A cidade deve ser uma string válida' })
  city?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'O endereço é obrigatório' })
  @IsString({ message: 'O endereço deve ser uma string válido' })
  address?: string;

  @IsOptional()
  @IsString({ message: 'O número deve ser uma string válida' })
  number?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'O preço é obrigatório' })
  @IsNumber({}, { message: 'O preço deve ser um número válido' })
  @Min(0, { message: 'O preço não pode ser negativo' })
  @Type(() => Number)
  price?: number;
}

import { IsArray, IsInt, IsNotEmpty } from 'class-validator';

export class IdsDto {
  @IsInt({ each: true })
  @IsArray()
  @IsNotEmpty()
  ids: number[];
}

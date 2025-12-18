import { Body, Controller, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { ProfilesService } from '../services/profiles.service';
import { UpdateProfileDto } from 'src/domain/dtos';
import { ProfileEntity } from 'src/domain/entities';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Patch('/:id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() dto: UpdateProfileDto,
  ): Promise<ProfileEntity> {
    return this.profilesService.update(+id, dto);
  }
}

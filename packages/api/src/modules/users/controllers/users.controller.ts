import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { SearchUserDto, UserOnboardingDto } from 'src/domain/dtos';
import {
  ResultEntity,
  UserWithoutPasswordEntity,
  UserWithoutPasswordWithProfileEntity,
} from 'src/domain/entities';
import { AlsService, USER_ID_CONSTANT } from '@/als';
import { AuthGuard } from 'src/modules/shared/guards';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly alsService: AlsService,
  ) {}

  @Post('onboarding')
  onboarding(
    @Body() dto: UserOnboardingDto,
  ): Promise<UserWithoutPasswordWithProfileEntity> {
    return this.usersService.onboarding(dto);
  }

  @Get('/@me')
  @UseGuards(AuthGuard)
  me() {
    const userId = this.alsService.getOrThrowError<number>(USER_ID_CONSTANT);

    return this.usersService.findById(+userId);
  }

  @Get()
  search(
    @Query() queryParams: SearchUserDto,
  ): Promise<ResultEntity<UserWithoutPasswordEntity>> {
    return this.usersService.search(queryParams);
  }

  @Get(':id')
  findById(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<UserWithoutPasswordEntity> {
    return this.usersService.findById(+id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async softDelete(@Param('id', ParseIntPipe) id: string): Promise<void> {
    await this.usersService.softDelete(+id);
  }
}

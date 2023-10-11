import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('admin')
@UseGuards(AuthGuard('google'), RolesGuard)
export class AdminController {
  @Get()
  @Roles('admin')
  @Render('admin') // You'll create this view next
  async dashboard() {
    return {};
  }
}

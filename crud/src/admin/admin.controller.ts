import { Controller, Get, Post, Patch, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminService } from './admin.service';
import { Admin } from './admin.entity';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto);
  }

  @Patch(':id/country')
  updateCountry(@Param('id', new ParseIntPipe({ errorHttpStatusCode: 400 })) id: number, 
               @Body('country') country: string): Promise<void> {
    return this.adminService.updateCountry(id, country);
  }

  @Get('by-joining-date')
  findByJoiningDate(
    @Query('start') start: string,
    @Query('end') end: string
  ): Promise<Admin[]> {
    return this.adminService.findByJoiningDate(new Date(start), new Date(end));
  }

  @Get('default-country')
  findDefaultCountry(): Promise<Admin[]> {
    return this.adminService.findDefaultCountryUsers();
  }
}

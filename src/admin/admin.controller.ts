import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, NotFoundException, BadRequestException } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { CreatePathDataDto } from './dto/create-path-data.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Get(':table')
  async findAll(@Param('table') table: string) {
    try {
      const entries = await this.adminService.findAll(table);
      return { entries };
    } catch (error) {
      if (error instanceof BadRequestException) {
        return { error: error.message };
      }
      throw error;
    }
  }

  @Post(':table')
  async createExchange(@Param('table') table: string, @Body() createAdminDto: CreateAdminDto) {
    try {
      const createdEntry = await this.adminService.createExchange(table, createAdminDto);
      return { entry: createdEntry };
    } catch (error) {
      if (error instanceof BadRequestException) {
        return { error: error.message };
      }
      throw error;
    }
  }

  @Post('pathData') // Use 'pathData' instead of 'path'
  async createPathData(@Body() createPathDataDto: CreatePathDataDto) {
    try {
      const createdPathData = await this.adminService.createPathData(createPathDataDto);
      return { entry: createdPathData };
    } catch (error) {
      if (error instanceof BadRequestException) {
        return { error: error.message };
      }
      throw error;
    }
  }


}

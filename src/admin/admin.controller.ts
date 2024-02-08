import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, NotFoundException, BadRequestException } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { CreatePathDataDto } from './dto/create-path-data.dto';
import { CreateLiquidityPoolDto } from './dto/create-liquidity-pool.dto';
import { UpdateLiquidityPoolDto } from './dto/update-liquidity-pool.dto';

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

  @Get('liquidityPool/:pool_address') // Define route to retrieve liquidity pool by pool_address
  async findLiquidityPool(@Param('pool_address') pool_address: string) {
    try {
      const liquidityPool = await this.adminService.findLiquidityPool(pool_address);
      return { liquidityPool };
    } catch (error) {
      if (error instanceof BadRequestException) {
        return { error: error.message };
      }
      throw error;
    }
  }

  @Post('liquidityPool') 
  async createLiquidityPool(@Body() createLiquidityPoolDto: CreateLiquidityPoolDto) {
    try {
      const createdLiquidityPool = await this.adminService.createLiquidityPool(createLiquidityPoolDto);
      return { entry: createdLiquidityPool };
    } catch (error) {
      if (error instanceof BadRequestException) {
        return { error: error.message };
      }
      throw error;
    }
  }

  @Patch('liquidityPool/:pool_address')
  async updateLiquidityPool(@Param('pool_address') pool_address: string, @Body() updateLiquidityPoolDto: UpdateLiquidityPoolDto) {
    try {
      const updatedLiquidityPool = await this.adminService.updateLiquidityPool(pool_address, updateLiquidityPoolDto);
      return { entry: updatedLiquidityPool };
    } catch (error) {
      if (error instanceof BadRequestException) {
        return { error: error.message };
      }
      throw error;
    }
  }

  // @Post(':table')
  // async createExchange(@Param('table') table: string, @Body() createAdminDto: CreateAdminDto) {
  //   try {
  //     const createdEntry = await this.adminService.createExchange(table, createAdminDto);
  //     return { entry: createdEntry };
  //   } catch (error) {
  //     if (error instanceof BadRequestException) {
  //       return { error: error.message };
  //     }
  //     throw error;
  //   }
  // }

  // @Post('pathData') 
  // async createPathData(@Body() createPathDataDto: CreatePathDataDto) {
  //   try {
  //     const createdPathData = await this.adminService.createPathData(createPathDataDto);
  //     return { entry: createdPathData };
  //   } catch (error) {
  //     if (error instanceof BadRequestException) {
  //       return { error: error.message };
  //     }
  //     throw error;
  //   }
  // }
}

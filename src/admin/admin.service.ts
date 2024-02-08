import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { CreatePathDataDto } from './dto/create-path-data.dto';
import { CreateLiquidityPoolDto } from './dto/create-liquidity-pool.dto';
import { UpdateLiquidityPoolDto } from './dto/update-liquidity-pool.dto';

import { PrismaClient, LiquidityPool } from '@prisma/client'; // เพิ่มชื่อ Table ที่ต้องการด้วย

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(table: string) {
    const validTables = ['liquidityPool'];  // เพิ่มชื่อ Table ที่ต้องการด้วย

    if (!validTables.includes(table)) {
      throw new BadRequestException('Invalid table specified');
    }

    return this.prisma[table].findMany();
  }

  async findLiquidityPool(pool_address: string): Promise<LiquidityPool | null> {
    try {
      return this.prisma.liquidityPool.findUnique({ where: { pool_address } });
    } catch (error) {
      throw new BadRequestException('Failed to retrieve data from LiquidityPool table');
    }
  }

  async createLiquidityPool(createLiquidityPoolDto: CreateLiquidityPoolDto): Promise<LiquidityPool> {
    try {
      return this.prisma.liquidityPool.create({ data: createLiquidityPoolDto });
    } catch (error) {
      throw new BadRequestException('Failed to create data in LiquidityPool table');
    }
  }

  async updateLiquidityPool(pool_address: string, updateLiquidityPoolDto: UpdateLiquidityPoolDto): Promise<LiquidityPool> {
    try {
      return this.prisma.liquidityPool.update({
        where: { pool_address },
        data: updateLiquidityPoolDto,
      });
    } catch (error) {
      throw new BadRequestException('Failed to update data in LiquidityPool table');
    }
  }

  // async createExchange(table: string, createAdminDto: CreateAdminDto): Promise<Exchange_1 | Exchange_2> {
  //   const validTables = ['exchange_1', 'exchange_2', 'pathData', 'liquidityPool']; // เพิ่มชื่อ Table ที่ต้องการด้วย

  //   if (!validTables.includes(table)) {
  //     throw new BadRequestException('Invalid table specified');
  //   }

  //   return this.prisma[table].create({ data: createAdminDto });
  // }

  // async createPathData(createPathDataDto: CreatePathDataDto): Promise<PathData> {
  //   try {
  //     return this.prisma.pathData.create({ data: createPathDataDto });
  //   } catch (error) {
  //     throw new BadRequestException('Failed to create data in PathData table');
  //   }
  // }
}


// old schema.prisma
// model Exchange_1 {
//   token0     String
//   token1     String
//   address    String   @id @unique
//   liquidity0 String
//   liquidity1 String
// }

// model Exchange_2 {
//   token0     String
//   token1     String
//   address    String   @id @unique
//   liquidity0 String
//   liquidity1 String
// }

// model PathData {
//   pathToken String   @id @unique
//   pathReach String
// }

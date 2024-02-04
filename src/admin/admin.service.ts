import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { CreatePathDataDto } from './dto/create-path-data.dto';

import { PrismaClient, Exchange_1, Exchange_2, PathData } from '@prisma/client'; // เเก้ User, Message เป็นชื่อ Table ที่ต้องการด้วย

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(table: string) {
    const validTables = ['exchange_1', 'exchange_2', 'pathData']; // Add more tables if needed

    if (!validTables.includes(table)) {
      throw new BadRequestException('Invalid table specified');
    }

    return this.prisma[table].findMany();
  }

  async createExchange(table: string, createAdminDto: CreateAdminDto): Promise<Exchange_1 | Exchange_2> {
    const validTables = ['exchange_1', 'exchange_2', 'pathData']; // Add more tables if needed

    if (!validTables.includes(table)) {
      throw new BadRequestException('Invalid table specified');
    }

    return this.prisma[table].create({ data: createAdminDto });
  }

  async createPathData(createPathDataDto: CreatePathDataDto): Promise<PathData> {
    try {
      return this.prisma.pathData.create({ data: createPathDataDto });
    } catch (error) {
      throw new BadRequestException('Failed to create data in PathData table');
    }
  }
}

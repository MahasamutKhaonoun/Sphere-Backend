import { PartialType } from '@nestjs/mapped-types';
import { CreateLiquidityPoolDto } from './create-liquidity-pool.dto';

export class UpdateLiquidityPoolDto extends PartialType(CreateLiquidityPoolDto) {}

import { Module } from "@nestjs/common";
import { MyGateway } from "./gateway";
import { PrismaClient } from "@prisma/client";
import { UsersService } from "src/users/users.service";
import { EthereumService } from "src/ethereum/ethereum.service";

@Module({
    providers: [MyGateway, PrismaClient, UsersService, EthereumService],
})
export class GatewayModule {}
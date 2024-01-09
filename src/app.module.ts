import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GatewayModule } from './gateway/gateway.module';
import { EthereumModule } from './ethereum/ethereum.module';

@Module({
  imports: [UsersModule, GatewayModule, EthereumModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

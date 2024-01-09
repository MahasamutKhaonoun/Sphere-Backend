import { Controller, Get, Param, Query } from '@nestjs/common';
import { EthereumService } from './ethereum.service';

@Controller('ethereum')
export class EthereumController {
    constructor(private readonly ethereumService: EthereumService) {}

    @Get('balance')
    async getBalance(@Query('address') address: string): Promise<string> {
        if (!address) {
        return 'Please provide an Ethereum address.';
        }

        const balance = await this.ethereumService.getBalance(address);
        return `Balance of ${address}: ${balance} ETH`;
    }

    @Get('connect-ether')
    async connectEther(): Promise<any> {
        try {
            const result = await this.ethereumService.ConnectEther();
            return { message: 'Connected to Ethereum', result };
        } catch (error) {
            return { error: 'Failed to connect to Ethereum', message: error.message };
        }
    }
    
}



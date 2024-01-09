import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { BrowserProvider, parseUnits } from "ethers";

@Injectable()
export class EthereumService {
    private provider: ethers.JsonRpcProvider;

  constructor() {
    this.provider = new ethers.JsonRpcProvider('https://eth.llamarpc.com');
  }

  public async getBalance(address: string): Promise<string> {
    // Query the state of the blockchain
    const blockNumber = await this.provider.getBlockNumber();
    const balance = await this.provider.getBalance("ethers.eth");

    // Log the block number and balance
    // console.log(`Current block number: ${blockNumber}`);
    // console.log(`Current balance: ${balance}`);

    return ethers.formatEther(balance);
  }

  // Old Version
  public async ConnectEther(): Promise<any> {
  
    // Query the state of the blockchain
    const blockNumber = await this.provider.getBlockNumber();
    const balance = await this.provider.getBalance("ethers.eth");
  
    // Log the block number and balance
    console.log(`Current block number: ${blockNumber}`);
    console.log(`Current balance: ${balance}`);

    return {
      currentBlockNumber: blockNumber,
      currentBalance: balance.toString(),
    };
  }

}


// private async _connectEther(): Promise<Provider> {
//     // Connect to Ethereum using a custom RPC backend
//     //const provider = new ethers.JsonRpcProvider("https://eth.meowrpc.com"); // Dead Block
//     const provider = new ethers.JsonRpcProvider("https://eth-rpc.gateway.pokt.network");
    
//     // Return the provider
//     return provider;
//   }

//   public async ConnectEther(): Promise<any> {
//     // Get the provider
//     const provider = await this._connectEther();
  
//     // Query the state of the blockchain
//     const blockNumber = await provider.getBlockNumber();
//     const balance = await provider.getBalance("ethers.eth");
  
//     // Log the block number and balance
//     console.log(`Current block number: ${blockNumber}`);
//     console.log(`Current balance: ${balance}`);

//     return {
//       currentBlockNumber: blockNumber,
//       currentBalance: balance.toString(),
//     };
//   }
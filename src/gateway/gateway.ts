import { OnModuleInit } from "@nestjs/common";
import { MessageBody ,SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket } from "dgram";
import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client";
import { UsersService } from "src/users/users.service";
import { EthereumService } from "src/ethereum/ethereum.service";

@WebSocketGateway({
    cors : {
        origin : ['http://localhost:3000']
    },
})

export class MyGateway implements OnModuleInit {
    @WebSocketServer()
    server: Server;

    constructor(
        private readonly prisma: PrismaClient,
        private readonly usersService: UsersService,
        private readonly ethereumService: EthereumService,
    ) {}

    // onModuleInit() {
    //     this.server.on('connection', (socket) => {
    //         console.log(socket.id);
    //         console.log('Connected');
    //     });
    // }

    onModuleInit() {
        this.server.on('connection', (socket) => {
            console.log(socket.id);
            console.log('Connected');
        });

        // Call connectEther every 5 seconds and emit the result
        setInterval(async () => {
            try {
                const result = await this.ethereumService.ConnectEther();
                this.server.emit('onEthereum', {
                    msg: 'Data from connectEther',
                    content: result,
                });
            } catch (error) {
                console.error('Error from connectEther:', error.message);
            }
        }, 10000); // 5000 milliseconds = 5 seconds
    }

    
    @SubscribeMessage('newMessage')
    async onNewMessage(@MessageBody() body: any) {
        console.log(body);
        const newMessage = await this.usersService.createMessage(body);       
        this.server.emit('onMessage', {
            msg: 'New Message',
            content: body,
        });
    }
  
}
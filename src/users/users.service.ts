import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { PrismaClient, User, Message } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaClient) {}

  
  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({ data: createUserDto });
  }

  async findAll() {
    return this.prisma.user.findMany();
    
  }

  async findOne(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number): Promise<User | null> {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  //---------------------<<Message>>---------------------//

  async findAllMessages(): Promise<Message[]> {
    // Retrieve the latest 15 messages
    const latestMessages = await this.prisma.message.findMany({
      take: 15,
      orderBy: {
          timestamp: 'asc', // Order by timestamp 
      },
    });

  return latestMessages;
    // return this.prisma.message.findMany(); // Old Version No LatestMessage Check
  }

  async createMessage(message: { sender: string; content: string }): Promise<Message> {
    const newMessage = await this.prisma.message.create({
        data: {
            sender: message.sender,
            content: message.content,
        },
    });

    // Retrieve the count of messages
    const messageCount = await this.prisma.message.count();

    // If the message count exceeds 15, delete the oldest messages
    if (messageCount > 15) {
        const messagesToDelete = messageCount - 15;

        // Retrieve the IDs of the oldest messages
        const oldestMessageIds = await this.prisma.message.findMany({
            take: messagesToDelete,
            select: {
                id: true,
            },
            orderBy: {
                timestamp: 'asc', // Order by timestamp 
            },
        });

        // Extract the IDs
        const idsToDelete = oldestMessageIds.map((message) => message.id);

        // Delete the oldest messages by ID
        await this.prisma.message.deleteMany({
            where: {
                id: {
                    in: idsToDelete,
                },
            },
        });
    }
    return newMessage;
  }

}

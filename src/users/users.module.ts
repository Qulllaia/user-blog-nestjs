import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { User } from './user.model';
import { Post } from 'src/posts/posts.model';
import { join } from 'path';
import { UserService } from './user.service';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Post]),
    ClientsModule.register([
      {
        name: 'USER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'gRPC',
          protoPath: join(__dirname, 'user.proto'),
          url: 'localhost:50051',
          loader: {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true,
          },
        },
      },
    ]),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}

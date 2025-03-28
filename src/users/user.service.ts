import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface GrpcClientService {
  GetUser(data: { user_id: string }): Observable<any>;
}

@Injectable()
export class UserService {
  private grpcClientService: GrpcClientService;

  constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.grpcClientService =
      this.client.getService<GrpcClientService>('UserService');
  }

  getUser(userId: string) {
    return this.grpcClientService.GetUser({ user_id: userId });
  }
}

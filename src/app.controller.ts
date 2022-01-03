import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod, RpcException } from "@nestjs/microservices";
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { LoginRequest, UserModel } from './auth';
import { internet, name, datatype, address } from 'faker';
import { AddressListRequest, AddressModel } from './adress';
import { Status } from "@grpc/grpc-js/build/src/constants";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @GrpcMethod('Auth', 'Login')
  authLogin(
    data: LoginRequest,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): { user: UserModel } {
    return {
      user: {
        id: datatype.uuid(),
        username: data.username,
        email: internet.email(),
        name: [name.firstName(), name.lastName()].join(' '),
      },
    };
  }

  @GrpcMethod('Address', 'List')
  addressList(
    data: AddressListRequest,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): { addresses: AddressModel[] } {

    const authorized = metadata.get('authorization').find((value) => {
      switch (value.toString()) {
        case 'bearer GlovoryBearerAuth':
        case 'GlovoryBearerAuth':
          return true;
        default:
          return false;
      }
    });

    if (!authorized) {

      const serverMetadata = new Metadata();
      serverMetadata.add('status', 'Unauthorized');
      call.sendMetadata(serverMetadata);

       throw new RpcException({ message:"Unauthenticated", code: Status.UNAUTHENTICATED });
    }

    return {
      addresses: [
        {
          id: datatype.uuid(),
          address: address.streetAddress(),
          city: address.city(),
        },
      ],
    };
  }
}

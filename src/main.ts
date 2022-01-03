import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { join } from 'path';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'glovory',
        url: '0.0.0.0:5051',
        protoPath: join(__dirname, '..', 'protos/auth.proto'),
      },
    },
  );
  app.listen();
}
bootstrap();
//
// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//
//   const protoDir = join(__dirname, '..', 'protos');
//   app.connectMicroservice({
//     transport: Transport.GRPC,
//     options: {
//       url: '0.0.0.0:5000',
//       package: 'rpc',
//       protoPath: '/rpc/rpc.proto',
//       loader: {
//         keepCase: true,
//         longs: Number,
//         defaults: false,
//         arrays: true,
//         objects: true,
//         includeDirs: [protoDir],
//       },
//     },
//   });
//
//   await app.startAllMicroservices();
//   await app.listen(3000);
// }
//
// (async () => await bootstrap())();

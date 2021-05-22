import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { graphQlModule } from './graphQlModule';
import { mongooseModule } from './mongoose.module';
import { uiModule } from './ui.module';

@Module({
  imports: [UserModule, uiModule, mongooseModule, graphQlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

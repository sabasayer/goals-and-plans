import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

export const uiModule = ServeStaticModule.forRoot({
  rootPath: join(__dirname, '../../../svelte/public'),
});

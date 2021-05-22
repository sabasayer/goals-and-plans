import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

export const graphQlModule = GraphQLModule.forRoot({
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
});

import { MongooseModule } from "@nestjs/mongoose";

export const mongooseModule = MongooseModule.forRoot('mongodb://localhost/nest');

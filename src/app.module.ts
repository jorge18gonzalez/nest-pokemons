import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonModule } from './pokemon/pokemon.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { joiValidationSchema } from './config/joi-validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load:[EnvConfiguration],
      validationSchema:joiValidationSchema
    }),
    PokemonModule, 
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
    }),

    MongooseModule.forRoot(process.env.MONGDB ,{
      dbName:"pokemonsdb"
    }),

    CommonModule,
    SeedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(){}
}

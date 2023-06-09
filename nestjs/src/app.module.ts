import { CacheModule, Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { JwtAccessStrategy } from "./auth/strategies/jwt-access.strategy";
import { JwtRefreshStrategy } from "./auth/strategies/jwt-refresh.strategy";
import { RedisClientOptions } from "redis";
import * as redisStore from "cache-manager-redis-store";
import { MapModule } from "./maps/maps.module";
import { BlockUserModule } from "./blocks/blocks.module";
import { MailModule } from "./mails/mails.module";
import { QuestionModule } from "./questions/questions.module";
import { FriendsModule } from "./friends/friends.module";
import { FilesModule } from "./files/files.module";
import { NoticesModule } from "./notices/notice.module";
import { InterestsModule } from "./interests/interests.module";
import { AppController } from "./app.controller";

@Module({
  imports: [
    AuthModule,
    BlockUserModule,
    FriendsModule,
    FilesModule,
    InterestsModule,
    MailModule,
    MapModule,
    NoticesModule,
    UsersModule,
    QuestionModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => ({
        autoSchemaFile: true,
        context: ({ req, res }) => ({ req, res }),
        cors: {
          origin: process.env.ORIGIN,
          credentials: true,
        },
        uploads: false,
      }),
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.TYPEORM_HOST,
      port: Number(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [__dirname + "/**/*.entity.*"],
      synchronize: true,
      logging: true,
      timezone: process.env.TZ,
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: process.env.REDIS_CONNECTION,
      isGlobal: true,
    }),
  ],
  providers: [
    JwtAccessStrategy, //
    JwtRefreshStrategy,
  ],
  controllers: [
    AppController, //
  ],
})
export class AppModule {}

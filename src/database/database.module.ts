import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
            type: "mysql",
            password: configService.get("PASSWORD"),
            username: configService.get("USER_NAME"),
            host: configService.get("HOST"),
            database: configService.get("DATABASE"),
            port: configService.get("PORT"),
            entities: ["dist/**/*.entity{.ts,.js}"],
            synchronize: true
        }),
        inject: [ConfigService]
    })]
})
export class DatabaseModule { }

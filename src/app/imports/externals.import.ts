import { ConfigModule } from '@nestjs/config';

export const externalsImportsAppModule = [ConfigModule.forRoot()];

import { Module } from '@nestjs/common';
import { internalsImportsAppModule } from './app/imports/internals.imports';
import { externalsImportsAppModule } from './app/imports/externals.import';

@Module({
  imports: [...internalsImportsAppModule, ...externalsImportsAppModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

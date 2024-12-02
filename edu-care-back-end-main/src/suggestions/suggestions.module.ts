import { Module } from '@nestjs/common'
import { SuggestionsService } from './suggestions.service'
import { SuggestionsController } from './suggestions.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Suggestions } from '@/suggestions/entities/suggestion.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Suggestions])],
  controllers: [SuggestionsController],
  providers: [SuggestionsService]
})
export class SuggestionsModule {}

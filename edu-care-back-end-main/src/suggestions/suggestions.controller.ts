import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { SuggestionsService } from './suggestions.service'
import { CreateSuggestionDto } from './dto/create-suggestion.dto'
import { UpdateSuggestionDto } from './dto/update-suggestion.dto'
import { DepressionLevel } from '@/suggestions/enum/suggestions.enum'

@Controller('suggestions')
export class SuggestionsController {
  constructor(private readonly suggestionsService: SuggestionsService) {}

  @Post()
  create(@Body() createSuggestionDto: CreateSuggestionDto) {
    return this.suggestionsService.create(createSuggestionDto)
  }

  @Get()
  findOneByDepressionLevel(@Query('depressionLevel') depressionLevel: DepressionLevel) {
    console.log('depressionLevel', depressionLevel)
    return this.suggestionsService.findOneByDepressionLevel(depressionLevel)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suggestionsService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSuggestionDto: UpdateSuggestionDto) {
    return this.suggestionsService.update(+id, updateSuggestionDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suggestionsService.remove(+id)
  }
}

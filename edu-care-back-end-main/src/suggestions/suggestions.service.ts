import { Suggestions } from 'src/suggestions/entities/suggestion.entity'
import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateSuggestionDto } from './dto/create-suggestion.dto'
import { UpdateSuggestionDto } from './dto/update-suggestion.dto'
import { DepressionLevel } from '@/suggestions/enum/suggestions.enum'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class SuggestionsService {
  constructor(
    @InjectRepository(Suggestions)
    private readonly suggestionsRepository: Repository<Suggestions>
  ) {}

  create(createSuggestionDto: CreateSuggestionDto) {
    return 'This action adds a new suggestion'
  }

  findAll() {
    return `This action returns all suggestions`
  }

  findOneByDepressionLevel(depressionLevel: DepressionLevel) {
    const suggestions = this.suggestionsRepository.findOne({
      where: { depressionLevel },
      select: ['depressionLevel', 'suggestion']
    })
    if (!suggestions) {
      throw new NotFoundException(`Suggestion with DepressionLevel: ${depressionLevel} not found`)
    }
    return suggestions
  }

  findOne(id: number) {
    return `This action returns a #${id} suggestion`
  }

  update(id: number, updateSuggestionDto: UpdateSuggestionDto) {
    return `This action updates a #${id} suggestion`
  }

  remove(id: number) {
    return `This action removes a #${id} suggestion`
  }
}

import { EntityBase } from '@/shared/entity/base.entity'
import { DepressionLevel } from '@/suggestions/enum/suggestions.enum'
import { Entity, Column } from 'typeorm'

@Entity('suggestions')
export class Suggestions extends EntityBase {
  @Column({
    type: 'enum',
    enum: DepressionLevel,
    name: 'depression_level',
    default: DepressionLevel.NoDepression
  })
  depressionLevel: DepressionLevel

  @Column({ type: 'text', name: 'suggestion' })
  suggestion: string
}

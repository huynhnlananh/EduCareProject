import { PHQ9Responses } from '@/phq9-responses/entities/phq9-response.entity'
import { EntityBase } from '@/shared/entity/base.entity'
import { DepressionLevel } from '@/surveys/enum/surveys.enum'
import { Users } from '@/users/entities/user.entity'
import { Entity, ManyToOne, Column, JoinColumn, OneToMany } from 'typeorm'

@Entity('surveys')
export class Surveys extends EntityBase {
  @ManyToOne(() => Users, (user) => user.surveys)
  @JoinColumn({ name: 'user_id' })
  user: Users

  @Column({ type: 'tinyint', name: 'total_score' })
  totalScore: number

  @Column({
    type: 'enum',
    enum: DepressionLevel,
    name: 'depression_level',
    default: DepressionLevel.NoDepression
  })
  depressionLevel: DepressionLevel

  @OneToMany(() => PHQ9Responses, (response) => response.survey)
  responses: PHQ9Responses[]
}

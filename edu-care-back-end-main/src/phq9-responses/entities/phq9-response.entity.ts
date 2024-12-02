import { PHQ9Questions } from '@/phq9-questions/entities/phq9-question.entity'
import { EntityBase } from '@/shared/entity/base.entity'
import { Surveys } from '@/surveys/entities/survey.entity'
import { Users } from '@/users/entities/user.entity'
import { Entity, ManyToOne, Column, JoinColumn } from 'typeorm'

@Entity('phq9_responses')
export class PHQ9Responses extends EntityBase {
  @ManyToOne(() => Users, (user) => user.phq9Responses)
  @JoinColumn({ name: 'user_id' })
  user: Users

  @ManyToOne(() => Surveys, (survey) => survey.responses)
  @JoinColumn({ name: 'survey_id' })
  survey: Surveys

  @ManyToOne(() => PHQ9Questions, (question) => question.responses)
  @JoinColumn({ name: 'question_id' })
  question: PHQ9Questions

  @Column({ type: 'tinyint', name: 'answer_value' })
  answerValue: number
}

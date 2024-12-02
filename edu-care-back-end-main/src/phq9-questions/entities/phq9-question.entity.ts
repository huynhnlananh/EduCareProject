import { PHQ9AnswerQuestions } from '@/phq9-answer-questions/entities/phq9-answer-question.entity'
import { PHQ9Responses } from '@/phq9-responses/entities/phq9-response.entity'
import { EntityBase } from '@/shared/entity/base.entity'
import { Entity, Column, OneToMany } from 'typeorm'

@Entity('phq9_questions')
export class PHQ9Questions extends EntityBase {
  @Column({ type: 'text', name: 'question_text' })
  questionText: string

  @OneToMany(() => PHQ9AnswerQuestions, (answer) => answer.question)
  answers: PHQ9AnswerQuestions[]

  @OneToMany(() => PHQ9Responses, (response) => response.question)
  responses: PHQ9Responses[]
}

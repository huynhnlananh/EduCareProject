import { AnswerOption } from '@/phq9-answer-questions/enum/phq9-answer-question.enum'
import { PHQ9Questions } from '@/phq9-questions/entities/phq9-question.entity'
import { EntityBase } from '@/shared/entity/base.entity'
import { Entity, ManyToOne, Column, JoinColumn } from 'typeorm'

@Entity('phq9_answer_questions')
export class PHQ9AnswerQuestions extends EntityBase {
  @ManyToOne(() => PHQ9Questions, (question) => question.answers)
  @JoinColumn({ name: 'question_id' })
  question: PHQ9Questions

  @Column({
    type: 'enum',
    enum: AnswerOption,
    name: 'answer_option'
  })
  answerOption: AnswerOption

  @Column({ type: 'text', name: 'answer_text' })
  answerText: string

  @Column({ type: 'tinyint', name: 'score' })
  score: number
}

import { PHQ9Responses } from '@/phq9-responses/entities/phq9-response.entity'
import { EntityBase } from '@/shared/entity/base.entity'
import { Surveys } from '@/surveys/entities/survey.entity'
import { Gender, Role } from '@/users/enum/user.enum'
import { Entity, Column, OneToMany } from 'typeorm'

@Entity('users')
export class Users extends EntityBase {
  @Column({ type: 'varchar', length: 255, unique: true, name: 'email' })
  email: string

  @Column({ type: 'varchar', length: 255, name: 'password' })
  password: string

  @Column({ type: 'varchar', length: 100, name: 'name' })
  name: string

  @Column({ type: 'varchar', length: 15, name: 'phone_number' })
  phoneNumber: string

  @Column({ type: 'date', name: 'birthday' })
  birthday: Date

  @Column({ type: 'text', nullable: true, name: 'hobby' })
  hobby: string

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.Other
  })
  gender: Gender

  @Column({ type: 'text', nullable: true, name: 'avatar' })
  avatar: string

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Student
  })
  role: Role

  @OneToMany(() => Surveys, (survey) => survey.user)
  surveys: Surveys[]

  @OneToMany(() => PHQ9Responses, (response) => response.user)
  phq9Responses: PHQ9Responses[]
}

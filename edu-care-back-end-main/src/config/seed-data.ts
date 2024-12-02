import { AppDataSource } from 'src/config/data-source'
import { PHQ9Questions } from 'src/phq9-questions/entities/phq9-question.entity'
import { PHQ9AnswerQuestions } from 'src/phq9-answer-questions/entities/phq9-answer-question.entity'
import { Surveys } from 'src/surveys/entities/survey.entity'
import { PHQ9Responses } from 'src/phq9-responses/entities/phq9-response.entity'
import { Suggestions } from 'src/suggestions/entities/suggestion.entity'
import { AnswerOption } from '@/phq9-answer-questions/enum/phq9-answer-question.enum'
import { DepressionLevel } from '@/suggestions/enum/suggestions.enum'
import { Users } from '@/users/entities/user.entity'
import { Gender, Role } from '@/users/enum/user.enum'

async function seed() {
  try {
    await AppDataSource.initialize()
    console.log('Connected to the database.')

    const users = await seedUsers()
    const questions = await seedPHQ9Questions()
    await seedPHQ9AnswerQuestions(questions)
    const surveys = await seedSurveys(users)
    await seedPHQ9Responses(surveys, questions)
    await seedSuggestions()

    await AppDataSource.destroy()
    console.log('Seed data successfully!')
  } catch (error) {
    console.error('Error seeding data:', error)
  }
}

// Seed bảng Users
async function seedUsers() {
  const userRepository = AppDataSource.getRepository(Users)

  const users: Users[] = []

  const sampleUsers = [
    {
      email: 'john.doe@example.com',
      password: 'password123',
      name: 'John Doe',
      phoneNumber: '+1 234 567 890',
      birthday: new Date('1990-05-15'),
      hobby: 'Reading, Traveling',
      gender: Gender.Male,
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      role: Role.Student
    },
    {
      email: 'jane.smith@example.com',
      password: 'password456',
      name: 'Jane Smith',
      phoneNumber: '+1 234 567 891',
      birthday: new Date('1985-08-22'),
      hobby: 'Photography, Cooking',
      gender: Gender.Female,
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      role: Role.Student
    },
    {
      email: 'michael.johnson@example.com',
      password: 'password789',
      name: 'Michael Johnson',
      phoneNumber: '+1 234 567 892',
      birthday: new Date('1992-11-30'),
      hobby: 'Gaming, Music',
      gender: Gender.Male,
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      role: Role.Student
    },
    {
      email: 'emily.davis@example.com',
      password: 'password101',
      name: 'Emily Davis',
      phoneNumber: '+1 234 567 893',
      birthday: new Date('1994-02-10'),
      hobby: 'Writing, Painting',
      gender: Gender.Female,
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
      role: Role.Student
    },
    {
      email: 'robert.brown@example.com',
      password: 'password102',
      name: 'Robert Brown',
      phoneNumber: '+1 234 567 894',
      birthday: new Date('1988-01-12'),
      hobby: 'Cycling, Hiking',
      gender: Gender.Male,
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
      role: Role.Student
    },
    {
      email: 'susan.miller@example.com',
      password: 'password103',
      name: 'Susan Miller',
      phoneNumber: '+1 234 567 895',
      birthday: new Date('1993-07-07'),
      hobby: 'Cooking, Traveling',
      gender: Gender.Female,
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
      role: Role.Student
    },
    {
      email: 'david.wilson@example.com',
      password: 'password104',
      name: 'David Wilson',
      phoneNumber: '+1 234 567 896',
      birthday: new Date('1990-09-20'),
      hobby: 'Sports, Reading',
      gender: Gender.Male,
      avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
      role: Role.Student
    },
    {
      email: 'laura.moore@example.com',
      password: 'password105',
      name: 'Laura Moore',
      phoneNumber: '+1 234 567 897',
      birthday: new Date('1987-04-18'),
      hobby: 'Yoga, Gardening',
      gender: Gender.Female,
      avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
      role: Role.Student
    },
    {
      email: 'charles.taylor@example.com',
      password: 'password106',
      name: 'Charles Taylor',
      phoneNumber: '+1 234 567 898',
      birthday: new Date('1995-03-25'),
      hobby: 'Football, Cooking',
      gender: Gender.Male,
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
      role: Role.Student
    },
    {
      email: 'sophia.jackson@example.com',
      password: 'password107',
      name: 'Sophia Jackson',
      phoneNumber: '+1 234 567 899',
      birthday: new Date('1991-06-14'),
      hobby: 'Dancing, Swimming',
      gender: Gender.Female,
      avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
      role: Role.Student
    }
  ]

  // Duyệt qua danh sách người dùng và tạo đối tượng User
  for (const userData of sampleUsers) {
    const user = new Users()
    user.email = userData.email
    user.password = userData.password // Bạn có thể mã hóa mật khẩu nếu cần
    user.name = userData.name
    user.phoneNumber = userData.phoneNumber
    user.birthday = userData.birthday
    user.hobby = userData.hobby
    user.gender = userData.gender
    user.avatar = userData.avatar
    user.role = userData.role

    // Lưu vào cơ sở dữ liệu
    const userSaved = await userRepository.save(user)
    users.push(userSaved)
  }

  console.log(`Seeded ${users.length} users successfully.`)
  return users
}

// Seed bảng phq9_questions
async function seedPHQ9Questions() {
  const questionRepository = AppDataSource.getRepository(PHQ9Questions)

  const result: PHQ9Questions[] = []

  const questions: Partial<PHQ9Questions>[] = [
    {
      questionText:
        'Trong 2 tuần qua, bạn cảm thấy ít hứng thú hoặc không có hứng thú trong các hoạt động mà bạn thường thích làm không?',
      createdBy: 1,
      updatedBy: 1
    },
    {
      questionText: 'Trong 2 tuần qua, bạn cảm thấy mệt mỏi hoặc không có năng lượng không?',
      createdBy: 1,
      updatedBy: 1
    },
    {
      questionText: 'Trong 2 tuần qua, bạn cảm thấy buồn bã, chán nản hoặc tuyệt vọng không?',
      createdBy: 1,
      updatedBy: 1
    },
    {
      questionText: 'Trong 2 tuần qua, bạn có cảm thấy khó ngủ, ngủ không ngon giấc hoặc ngủ quá nhiều không?',
      createdBy: 1,
      updatedBy: 1
    },
    {
      questionText: 'Trong 2 tuần qua, bạn có cảm thấy ăn uống không ngon hoặc ăn quá nhiều không?',
      createdBy: 1,
      updatedBy: 1
    },
    {
      questionText: 'Trong 2 tuần qua, bạn có cảm thấy như mình là người vô dụng hoặc cảm thấy tội lỗi quá mức không?',
      createdBy: 1,
      updatedBy: 1
    },
    {
      questionText:
        'Trong 2 tuần qua, bạn có gặp khó khăn trong việc tập trung vào công việc, học hành hoặc làm các việc hàng ngày không?',
      createdBy: 1,
      updatedBy: 1
    },
    {
      questionText:
        'Trong 2 tuần qua, bạn có cảm thấy cử động hoặc nói chuyện chậm chạp hoặc ngược lại là cảm thấy căng thẳng, không thể ngồi yên không?',
      createdBy: 1,
      updatedBy: 1
    },
    {
      questionText: 'Trong 2 tuần qua, bạn có cảm thấy cuộc sống của mình không còn có ý nghĩa gì không?',
      createdBy: 1,
      updatedBy: 1
    }
  ]

  for (const q of questions) {
    const question = new PHQ9Questions()
    question.questionText = q.questionText
    question.createdBy = 1
    // Lưu vào cơ sở dữ liệu
    const questionSaved = await questionRepository.save(question)
    result.push(questionSaved)
  }
  console.log(`Seeded ${questions.length} PHQ-9 questions successfully.`)
  return result
}

// Seed bảng phq9_answer_questions
async function seedPHQ9AnswerQuestions(questions: PHQ9Questions[]) {
  const answerRepository = AppDataSource.getRepository(PHQ9AnswerQuestions)

  // Kiểm tra xem câu hỏi đã được lấy chưa
  if (questions.length === 0) {
    console.log('No questions found. Make sure questions are seeded first.')
    return
  }

  const answers: Partial<PHQ9AnswerQuestions>[] = [
    // Các câu trả lời cho câu hỏi 1
    {
      question: questions[0],
      answerOption: AnswerOption.A,
      answerText: 'Không, tôi vẫn cảm thấy hứng thú như bình thường.',
      score: 0
    },
    {
      question: questions[0],
      answerOption: AnswerOption.B,
      answerText: 'Có, tôi cảm thấy ít hứng thú hơn.',
      score: 1
    },
    {
      question: questions[0],
      answerOption: AnswerOption.C,
      answerText: 'Có, tôi gần như không còn hứng thú gì.',
      score: 2
    },
    {
      question: questions[0],
      answerOption: AnswerOption.D,
      answerText: 'Có, tôi không cảm thấy hứng thú chút nào.',
      score: 3
    },

    // Các câu trả lời cho câu hỏi 2
    {
      question: questions[1],
      answerOption: AnswerOption.A,
      answerText: 'Không, tôi không cảm thấy mệt mỏi.',
      score: 0
    },
    {
      question: questions[1],
      answerOption: AnswerOption.B,
      answerText: 'Có, đôi khi tôi cảm thấy mệt mỏi.',
      score: 1
    },
    {
      question: questions[1],
      answerOption: AnswerOption.C,
      answerText: 'Có, tôi thường xuyên cảm thấy mệt mỏi.',
      score: 2
    },
    {
      question: questions[1],
      answerOption: AnswerOption.D,
      answerText: 'Có, tôi cảm thấy mệt mỏi hầu như suốt ngày.',
      score: 3
    },

    // Các câu trả lời cho câu hỏi 3
    {
      question: questions[2],
      answerOption: AnswerOption.A,
      answerText: 'Không, tôi không cảm thấy như vậy.',
      score: 0
    },
    {
      question: questions[2],
      answerOption: AnswerOption.B,
      answerText: 'Có, đôi khi tôi cảm thấy buồn.',
      score: 1
    },
    {
      question: questions[2],
      answerOption: AnswerOption.C,
      answerText: 'Có, tôi thường cảm thấy buồn và thất vọng.',
      score: 2
    },
    {
      question: questions[2],
      answerOption: AnswerOption.D,
      answerText: 'Có, tôi cảm thấy hoàn toàn tuyệt vọng.',
      score: 3
    },

    // Các câu trả lời cho câu hỏi 4
    {
      question: questions[3],
      answerOption: AnswerOption.A,
      answerText: 'Không, tôi không gặp vấn đề gì về giấc ngủ.',
      score: 0
    },
    {
      question: questions[3],
      answerOption: AnswerOption.B,
      answerText: 'Có, đôi khi tôi khó ngủ hoặc ngủ không ngon.',
      score: 1
    },
    {
      question: questions[3],
      answerOption: AnswerOption.C,
      answerText: 'Có, tôi gặp khó khăn trong việc ngủ và thức dậy muộn.',
      score: 2
    },
    {
      question: questions[3],
      answerOption: AnswerOption.D,
      answerText: 'Có, tôi cảm thấy buồn ngủ suốt cả ngày và ngủ quá nhiều.',
      score: 3
    },

    // Các câu trả lời cho câu hỏi 5
    {
      question: questions[4],
      answerOption: AnswerOption.A,
      answerText: 'Không, tôi ăn uống bình thường.',
      score: 0
    },
    {
      question: questions[4],
      answerOption: AnswerOption.B,
      answerText: 'Có, tôi ăn ít hơn bình thường.',
      score: 1
    },
    {
      question: questions[4],
      answerOption: AnswerOption.C,
      answerText: 'Có, tôi ăn nhiều hơn bình thường.',
      score: 2
    },
    {
      question: questions[4],
      answerOption: AnswerOption.D,
      answerText: 'Có, tôi gần như không ăn được gì hoặc ăn quá nhiều.',
      score: 3
    },

    // Các câu trả lời cho câu hỏi 6
    {
      question: questions[5],
      answerOption: AnswerOption.A,
      answerText: 'Không, tôi không cảm thấy như vậy.',
      score: 0
    },
    {
      question: questions[5],
      answerOption: AnswerOption.B,
      answerText: 'Có, đôi khi tôi cảm thấy vô dụng hoặc tội lỗi.',
      score: 1
    },
    {
      question: questions[5],
      answerOption: AnswerOption.C,
      answerText: 'Có, tôi cảm thấy vô dụng hoặc tội lỗi nhiều lần.',
      score: 2
    },
    {
      question: questions[5],
      answerOption: AnswerOption.D,
      answerText: 'Có, tôi cảm thấy tội lỗi và vô dụng suốt cả thời gian.',
      score: 3
    },

    // Các câu trả lời cho câu hỏi 7
    {
      question: questions[6],
      answerOption: AnswerOption.A,
      answerText: 'Không, tôi không gặp khó khăn gì trong việc tập trung.',
      score: 0
    },
    {
      question: questions[6],
      answerOption: AnswerOption.B,
      answerText: 'Có, đôi khi tôi cảm thấy khó khăn trong việc tập trung.',
      score: 1
    },
    {
      question: questions[6],
      answerOption: AnswerOption.C,
      answerText: 'Có, tôi thường xuyên gặp khó khăn trong việc tập trung.',
      score: 2
    },
    {
      question: questions[6],
      answerOption: AnswerOption.D,
      answerText: 'Có, tôi không thể tập trung vào bất kỳ công việc gì.',
      score: 3
    },

    // Các câu trả lời cho câu hỏi 8
    {
      question: questions[7],
      answerOption: AnswerOption.A,
      answerText: 'Không, tôi không cảm thấy gì khác thường.',
      score: 0
    },
    {
      question: questions[7],
      answerOption: AnswerOption.B,
      answerText: 'Có, đôi khi tôi cảm thấy chậm chạp hoặc căng thẳng.',
      score: 1
    },
    {
      question: questions[7],
      answerOption: AnswerOption.C,
      answerText: 'Có, tôi cảm thấy mình chậm chạp hoặc lo âu nhiều lần.',
      score: 2
    },
    {
      question: questions[7],
      answerOption: AnswerOption.D,
      answerText: 'Có, tôi cảm thấy rất chậm chạp hoặc rất căng thẳng và không thể ngồi yên.',
      score: 3
    },

    // Các câu trả lời cho câu hỏi 9
    {
      question: questions[8],
      answerOption: AnswerOption.A,
      answerText: 'Không, tôi vẫn thấy cuộc sống có ý nghĩa.',
      score: 0
    },
    {
      question: questions[8],
      answerOption: AnswerOption.B,
      answerText: 'Có, đôi khi tôi cảm thấy cuộc sống không còn ý nghĩa.',
      score: 1
    },
    {
      question: questions[8],
      answerOption: AnswerOption.C,
      answerText: 'Có, tôi cảm thấy cuộc sống không còn ý nghĩa một cách rõ rệt.',
      score: 2
    },
    {
      question: questions[8],
      answerOption: AnswerOption.D,
      answerText: 'Có, tôi cảm thấy cuộc sống hoàn toàn vô nghĩa và không có lý do gì để sống.',
      score: 3
    }
  ]

  await answerRepository.save(answers)
  console.log(`Seeded ${answers.length} PHQ-9 answer questions successfully.`)
}

// Seed bảng surveys
async function seedSurveys(users: Users[]) {
  const surveyRepository = AppDataSource.getRepository(Surveys)
  if (users.length === 0) {
    console.log('No questions found. Make sure questions are seeded first.')
    return
  }

  const result: Surveys[] = []
  const surveys: Partial<Surveys>[] = [
    {
      user: users[0],
      totalScore: 15,
      depressionLevel: DepressionLevel.MildDepression,
      createdBy: 1,
      updatedBy: 1
    },
    {
      user: users[1],
      totalScore: 2,
      depressionLevel: DepressionLevel.NoDepression,
      createdBy: 1,
      updatedBy: 1
    },
    {
      user: users[2],
      totalScore: 21,
      depressionLevel: DepressionLevel.VerySevereDepression,
      createdBy: 1,
      updatedBy: 1
    }
  ]

  for (const s of surveys) {
    const survey = new Surveys()
    survey.user = users[0]
    survey.totalScore = s.totalScore
    survey.depressionLevel = s.depressionLevel
    // Lưu vào cơ sở dữ liệu
    const surveySaved = await surveyRepository.save(survey)
    result.push(surveySaved)
  }

  console.log(`Seeded ${surveys.length} surveys successfully.`)
  return result
}

// Seed bảng phq9_responses
async function seedPHQ9Responses(surveys: Surveys[], questions: PHQ9Questions[]) {
  const responseRepository = AppDataSource.getRepository(PHQ9Responses)
  const userRepository = AppDataSource.getRepository(Users)
  // Lấy tất cả các user đã có trong cơ sở dữ liệu
  const users = await userRepository.find()

  // Kiểm tra xem câu hỏi đã được lấy chưa
  if (users.length === 0) {
    console.log('No questions found. Make sure questions are seeded first.')
    return
  }
  const responses: Partial<PHQ9Responses>[] = [
    {
      user: users.find((q) => q.id === 1),
      survey: surveys[0],
      question: questions[0],
      answerValue: 2,
      createdBy: 1,
      updatedBy: 1
    },
    {
      user: users.find((q) => q.id === 1),
      survey: surveys[0],
      question: questions[1],
      answerValue: 2,
      createdBy: 1,
      updatedBy: 1
    },
    {
      user: users.find((q) => q.id === 1),
      survey: surveys[0],
      question: questions[2],
      answerValue: 2,
      createdBy: 1,
      updatedBy: 1
    }
  ]

  await responseRepository.save(responses)
  console.log(`Seeded ${responses.length} PHQ-9 responses successfully.`)
}

// Seed bảng suggestions
async function seedSuggestions() {
  const suggestionRepository = AppDataSource.getRepository(Suggestions)
  const suggestions: Partial<Suggestions>[] = [
    {
      depressionLevel: DepressionLevel.NoDepression,
      suggestion:
        'Chúc mừng bạn! Bạn không có dấu hiệu trầm cảm. Tuy nhiên, hãy duy trì lối sống lành mạnh bằng cách thực hiện các hoạt động thể chất đều đặn, ăn uống hợp lý và ngủ đủ giấc. Đừng quên chăm sóc bản thân bằng cách tham gia các hoạt động yêu thích và dành thời gian cho gia đình và bạn bè. Điều này sẽ giúp bạn giữ được tinh thần lạc quan và hạnh phúc trong suốt cuộc sống.',
      createdBy: 1,
      updatedBy: 1
    },
    {
      depressionLevel: DepressionLevel.MildDepression,
      suggestion:
        'Mặc dù bạn đang gặp phải một số cảm giác buồn chán và thiếu năng lượng, nhưng bạn có thể cải thiện tình trạng này bằng cách bắt đầu thay đổi thói quen hàng ngày. Hãy thử đi dạo, tham gia các hoạt động thể thao nhẹ nhàng, hoặc thử tìm kiếm niềm vui trong những hoạt động sáng tạo như vẽ, viết hoặc chơi nhạc. Đừng ngần ngại chia sẻ cảm xúc của mình với người thân hoặc bạn bè. Nếu cần, hãy tìm sự giúp đỡ từ các chuyên gia để cải thiện tình hình.',
      createdBy: 1,
      updatedBy: 1
    },
    {
      depressionLevel: DepressionLevel.ModerateDepression,
      suggestion:
        'Trầm cảm mức độ vừa phải có thể ảnh hưởng đến công việc và cuộc sống hàng ngày của bạn. Hãy chú ý đến việc chăm sóc bản thân và tạo dựng những thói quen tốt như tập thể dục đều đặn, ngủ đủ giấc và ăn uống lành mạnh. Hãy thử tham gia các buổi trò chuyện hoặc nhóm hỗ trợ với những người có cảm giác tương tự. Điều này sẽ giúp bạn cảm thấy bớt cô đơn và tìm ra những cách giải quyết hiệu quả. Bạn cũng có thể xem xét việc gặp bác sĩ hoặc chuyên gia tâm lý để nhận sự giúp đỡ thêm.',
      createdBy: 1,
      updatedBy: 1
    },
    {
      depressionLevel: DepressionLevel.SevereDepression,
      suggestion:
        'Nếu bạn đang trải qua trầm cảm nặng, điều quan trọng là bạn không phải đối mặt một mình. Cảm giác tuyệt vọng có thể khiến bạn nghĩ rằng mình không thể vượt qua, nhưng hãy nhớ rằng có rất nhiều nguồn lực và sự hỗ trợ sẵn có. Hãy tìm kiếm sự hỗ trợ từ bác sĩ, nhà trị liệu hoặc các nhóm hỗ trợ tâm lý. Việc thảo luận về cảm xúc và trải nghiệm của mình với một chuyên gia có thể giúp bạn hiểu rõ hơn về tình trạng của mình và tìm ra cách giải quyết phù hợp. Bạn xứng đáng được chăm sóc và yêu thương.',
      createdBy: 1,
      updatedBy: 1
    },
    {
      depressionLevel: DepressionLevel.VerySevereDepression,
      suggestion:
        'Trầm cảm rất nặng có thể là một trải nghiệm rất khó khăn và cần sự can thiệp ngay lập tức. Nếu bạn cảm thấy không thể tiếp tục hoặc gặp khó khăn trong việc thực hiện các công việc cơ bản, hãy tìm sự hỗ trợ từ bác sĩ tâm lý, chuyên gia trị liệu hoặc các dịch vụ y tế. Đừng ngần ngại tìm kiếm sự trợ giúp khẩn cấp. Bạn không đơn độc, và có rất nhiều người sẵn lòng giúp đỡ bạn vượt qua tình trạng này. Đừng để sự đau khổ kéo dài thêm nữa, hãy bắt đầu bước đầu tiên hướng tới sự hồi phục ngay hôm nay.',
      createdBy: 1,
      updatedBy: 1
    }
  ]

  await suggestionRepository.save(suggestions)
  console.log(`Seeded ${suggestions.length} suggestions successfully.`)
}

seed()

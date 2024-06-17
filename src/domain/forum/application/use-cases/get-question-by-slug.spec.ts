import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from './create-question'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { Question } from '../../enterprise/entities/question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
    })

    it('should be able to get question by slug', async () => {
        const newQuestion = Question.create({
            title: 'Example Question',
            slug: Slug.create('example-question'),
            authorId: new UniqueEntityID(),
            content: '123'
        })

        inMemoryQuestionsRepository.create(newQuestion)

        const { question } = await sut.execute({
            slug: 'example-question'
        })
    
        expect(question.id).toBeTruthy()
        expect(question.title).toEqual(newQuestion.title)
    })
})
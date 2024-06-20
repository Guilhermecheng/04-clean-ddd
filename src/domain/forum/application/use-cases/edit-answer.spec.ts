import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { EditAnswerUseCase } from './edit-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Answer', () => {
    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository()
        sut = new EditAnswerUseCase(inMemoryAnswersRepository)
    })

    it('should be able to edit an answer', async () => {
        const newAnswer = makeAnswer({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('answer-1'))

        inMemoryAnswersRepository.create(newAnswer)

        await sut.execute({
            authorId: 'author-1',
            content: 'Conteúdo teste',
            answerId: newAnswer.id.toValue()
        })

        expect(inMemoryAnswersRepository.items[0]).toMatchObject({
            content: 'Conteúdo teste',
        })
    })

    it('should not be able to edit a answer from another user', async () => {
        const newAnswer = makeAnswer({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('answer-1'))

        inMemoryAnswersRepository.create(newAnswer)

        await expect(async () => await sut.execute({
            authorId: 'author-2',
            content: 'Conteúdo teste',
            answerId: newAnswer.id.toValue()
        })).rejects.toBeInstanceOf(Error)
    })
})
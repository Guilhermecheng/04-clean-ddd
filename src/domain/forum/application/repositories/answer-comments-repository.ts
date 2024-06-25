import { AnswerComment } from "../../enterprise/entities/answer-comment";

export interface AnswerCommentsRepository {
    create(answerComment: AnswerComment): Promise<void>
    delete(answerComment: AnswerComment): Promise<void>
    findById(id: string): Promise<AnswerComment | null>
}
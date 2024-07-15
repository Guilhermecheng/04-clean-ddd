import { QuestionAttachmentsRepository } from "@/domain/forum/application/repositories/question-attachments-repository";
import { QuestionAttachment } from "@/domain/forum/enterprise/entities/question-attachment";

export class InMemoryQuestionAttachmentsRepository implements QuestionAttachmentsRepository {
    public items: QuestionAttachment[] = [];

    async create(questionAttachment: QuestionAttachment) {
        this.items.push(questionAttachment)
    }

    async delete(questionAttachment: QuestionAttachment) {
        const itemIndex = this.items.findIndex(item => item.id === questionAttachment.id)
        
        this.items.splice(itemIndex, 1)
    }

    async findManyByQuestionId(questionId: string) {
        const questionAttachments = this.items.filter(item => item.questionId.toString() === questionId)

        return questionAttachments
    }
}
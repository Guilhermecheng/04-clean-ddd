import { Entity } from "../../core/entities/entity"
import { UniqueEntityID } from "../../core/entities/unique-entity-id";

interface StudentProps {
    name: string;
}

export class Students extends Entity<StudentProps> {
    static create(props: StudentProps, id?: UniqueEntityID) {
        const student = new Students(props , id);

        return student
    }
}
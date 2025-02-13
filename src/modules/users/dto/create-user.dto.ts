export class CreateUserDto {
    id: number;
    documentType: string;
    documentNumber: string;
    name: string;
    email: string;
    password: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    createdBy: number;
}

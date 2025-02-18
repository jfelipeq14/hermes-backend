import { ApiProperty } from "@nestjs/swagger";

export class CreateServiceDto {
    @ApiProperty()
    idCategoryServices: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    price: number;

    @ApiProperty()
    status: boolean;
}

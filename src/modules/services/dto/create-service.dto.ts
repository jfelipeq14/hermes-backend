import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateServiceDto {
    @ApiProperty({ required: true })
    @IsInt()
    @IsNotEmpty()
    idCategoryServices: number;

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ required: true })
    @IsDecimal()
    @IsNotEmpty()
    price: number;

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    status: boolean;
}

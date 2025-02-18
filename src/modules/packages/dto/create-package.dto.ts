import { ApiProperty } from "@nestjs/swagger";

export class CreatePackageDto {
    @ApiProperty()
    activity: string;

    @ApiProperty()
    start: number;

    @ApiProperty()
    end: number;

    @ApiProperty()
    idActivity: number;

    @ApiProperty()
    level: number;

    @ApiProperty()
    price: number;

    @ApiProperty()
    reserve: number;

    @ApiProperty()
    description: string;

    @ApiProperty()
    status: boolean;
}

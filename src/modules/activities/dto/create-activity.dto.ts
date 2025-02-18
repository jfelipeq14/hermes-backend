import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateActivityDto {
    @ApiProperty({ required: true, description: 'Name of the activity' })
    @IsString()
    @IsNotEmpty()
    name: string;
}

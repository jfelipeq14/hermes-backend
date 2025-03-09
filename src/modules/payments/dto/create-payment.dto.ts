import { ApiProperty } from '@nestjs/swagger';
import {
    IsDateString,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsString,
    IsBoolean,
    Matches
} from 'class-validator';
import {
    IsNumberRegex,
    IsDateRegex,
    IsStringRegex,
    IsPriceRegex,
} from 'src/utils/regex';


export class CreatePaymentDto {
    @ApiProperty({ required: true, description: 'Date of the payment' })
    @IsNotEmpty()
    @IsInt()
    @Matches(IsNumberRegex)
    idReservation: number;

    @ApiProperty({ required: true, description: 'Date of the payment' })
    @IsDateString()
    @IsNotEmpty()
    @Matches(IsDateRegex)
    date: Date;

    @ApiProperty({ required: true, description: 'Price of the payment' })
    @IsNumber()
    @IsNotEmpty()
    @Matches(IsPriceRegex)
    price: number;

    @ApiProperty({ required: true, description: 'Voucher of the payment' })
    @IsString()
    @IsNotEmpty()
    @Matches(IsStringRegex)
    voucher: string;

    @ApiProperty({ required: true, description: 'Status of the payment' })
    @IsBoolean()
    @IsNotEmpty()
    status: boolean;
}

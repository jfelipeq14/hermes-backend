import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  Min,
} from 'class-validator';
import { ImageExtensionRegex } from 'src/utils/regex';

export class CreatePaymentDto {
  @ApiProperty({ required: true, description: 'Date of the payment' })
  @IsInt()
  @IsNotEmpty()
  idReservation: number;

  @ApiProperty({ required: true, description: 'Date of the payment' })
  @IsDateString()
  // @Matches(IsDateRegex)
  @IsNotEmpty()
  date: Date;

  @ApiProperty({ required: true, description: 'Price of the payment' })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  price: number;

  @ApiProperty({ required: true, description: 'Voucher of the payment' })
  @IsString()
  @Matches(ImageExtensionRegex)
  @IsNotEmpty()
  voucher: string;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsBoolean,
  Matches,
} from 'class-validator';
import {
  // IsDateRegex,
  // IsPriceRegex,
  ImageExtensionRegex,
} from 'src/utils/regex';

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
  @IsNumber()
  // @Matches(IsPriceRegex)
  @IsNotEmpty()
  price: number;

  @ApiProperty({ required: true, description: 'Voucher of the payment' })
  @IsString()
  @Matches(ImageExtensionRegex)
  @IsNotEmpty()
  voucher: string;

  @ApiProperty({ required: true, description: 'Status of the payment' })
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}

import { IsString, IsNotEmpty, Length } from 'class-validator';

export class UpdateCountryDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 30)
  country: string;
}
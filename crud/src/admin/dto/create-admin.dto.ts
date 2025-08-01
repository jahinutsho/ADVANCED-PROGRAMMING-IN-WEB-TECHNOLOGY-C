import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAdminDto {
  @IsString({ message: 'Country must be a string' })
  @IsNotEmpty({ message: 'Country is required' })
  country: string;
}
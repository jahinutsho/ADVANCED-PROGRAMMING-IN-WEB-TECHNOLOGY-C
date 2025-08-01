import { MulterModule } from '@nestjs/platform-express';
import { IsString, IsNotEmpty, Matches, IsEmail } from 'class-validator';
import {  MaxLength } from 'class-validator';
import { Express } from 'express';


import { IsFile, MaxFileSize } from 'class-validator';

export class CreateHrDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z\s]+$/, { message: 'Name must contain only alphabets' })
  name: string;

  @IsEmail()
  @Matches(/@.*\.xyz$/, { message: 'Email must contain @ and end with .xyz domain' })
  email: string;

  @IsNotEmpty()
  @Matches(/^[A-Z]{2}\d{13}$/, { message: 'NID must be 2 uppercase letters followed by 13 digits' })
  nidNumber: string;

  // File validation now handled by Multer configuration
  nidImage: Express.Multer.File;
}
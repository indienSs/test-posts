import { 
  IsEmail, 
  IsString, 
  IsOptional, 
  IsDateString, 
  MaxLength, 
  MinLength,
  Matches 
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  avatar?: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  lastName: string;

  @IsOptional()
  @IsDateString()
  birthDate?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  about?: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @Matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, {
    message: 'Phone number is not valid',
  })
  phone?: string;
}
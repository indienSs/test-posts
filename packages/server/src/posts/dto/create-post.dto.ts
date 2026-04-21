import { IsString, IsOptional, IsArray, IsUUID, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MaxLength(2000)
  content: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsUUID()
  userId: string;
}
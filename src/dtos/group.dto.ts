import { IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  public name: string;
}

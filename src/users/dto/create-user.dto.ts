import { IsNotEmpty } from "class-validator";
export class CreateUserDto {
  @IsNotEmpty()
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }
  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.name = createUserDto.name;
    return await this.usersRepository.save(user);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    return await this.usersRepository.findOne({
      where: { id: id },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({
      where: { id: id },
    });
    user.name = updateUserDto.name;
    return await this.usersRepository.save(user);
  }
  async insertMany() {
    for (let i = 0; i < 10000; i++) {
      const users = [];
      for (let j = 0; j < 100; j++) {
        const user = new User();
        user.name = `user${i}`;
        users.push(user);
      }
      await this.usersRepository.save(users);
    }
    return { message: "ok" };
  }

  remove(id: number) {
    const user = this.usersRepository.delete(id);
    return user;
  }
}

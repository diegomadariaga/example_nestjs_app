import { Test, TestingModule } from "@nestjs/testing";
import { DeleteResult } from "typeorm";

import { CreateUserDto } from "../../src/users/dto/create-user.dto";
import { UpdateUserDto } from "../../src/users/dto/update-user.dto";
import { UsersController } from "../../src/users/users.controller";
import { UsersService } from "../../src/users/users.service";
import { User } from './../../src/users/entities/user.entity';

describe("UsersController", () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            insertMany: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should create a user", async () => {
    const dto: CreateUserDto = {
      /* fill with appropriate data */
    } as CreateUserDto
    const result = {
      /* expected result */
    };
    jest.spyOn(service, "create").mockResolvedValueOnce(result as User);

    expect(await controller.create(dto)).toBe(result);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it("should find all users", async () => {
    const result = [
      /* array of users */
    ];
    jest.spyOn(service, "findAll").mockResolvedValueOnce(result);

    expect(await controller.findAll()).toBe(result);
    expect(service.findAll).toHaveBeenCalled();
  });

  it("should find one user", async () => {
    const id = "1";
    const result = {
      /* user data */
    };
    jest.spyOn(service, "findOne").mockResolvedValueOnce(result as User);

    expect(await controller.findOne(id)).toBe(result);
    expect(service.findOne).toHaveBeenCalledWith(+id);
  });

  it("should update a user", async () => {
    const id = "1";
    const dto: UpdateUserDto = {
      /* fill with appropriate data */
    };
    const result = {
      /* expected result */
    };
    jest.spyOn(service, "update").mockResolvedValueOnce(result as User);

    expect(await controller.update(id, dto)).toBe(result);
    expect(service.update).toHaveBeenCalledWith(+id, dto);
  });

  it("should remove a user", async () => {
    const id = "1";
    const result = {
      /* expected result */
    } as DeleteResult;
    jest.spyOn(service, "remove").mockResolvedValueOnce(result);

    expect(await controller.remove(id)).toBe(result);
    expect(service.remove).toHaveBeenCalledWith(+id);
  });

  it("should insert many users", async () => {
    const result = {
      message: "ok",
    };
    jest.spyOn(service, "insertMany").mockResolvedValueOnce(result);

    expect(await controller.insertMany()).toBe(result);
    expect(service.insertMany).toHaveBeenCalled();
  });
});

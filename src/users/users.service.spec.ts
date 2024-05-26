import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

describe("UsersService", () => {
  let service: UsersService;
  let repo: Repository<User>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
  describe("create", () => {
    it("should create a user", async () => {
      const userDto = { name: "Test User" };
      const user = new User();
      user.name = userDto.name;

      jest.spyOn(repo, "save").mockResolvedValue(user);

      expect(await service.create(userDto)).toEqual(user);
      expect(repo.save).toHaveBeenCalledWith(user);
    });
    it("should throw an error if user already exists", async () => {
      const userDto = { name: "Test User" };
      const user = new User();
      user.name = userDto.name;

      jest.spyOn(repo, "save").mockRejectedValue(new Error("User already exists"));

      await expect(service.create(userDto)).rejects.toThrow("User already exists");
    });
  });
});

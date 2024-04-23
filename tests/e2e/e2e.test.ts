import { ValidationPipe } from "@nestjs/common";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";

import { AppModule } from "../../src/app.module";

describe("Health", () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("/GET health", () => {
    return request(app.getHttpServer())
      .get("/health")
      .expect(200)
      .expect({ status: "ok" });
  });
  describe("user", () => {
    describe("create", () => {
      it("should create a user", async () => {
        const response = await request(app.getHttpServer())
          .post("/users")
          .send({ name: "John" })
          .expect(201);
        expect(response.body.name).toBe("John");
      });
      it("should return 400 if name is missing", async () => {
        const response = await request(app.getHttpServer())
          .post("/users")
          .send({});
        console.log(response.body);
        expect(response.status).toBe(400);
      });
    });
    describe.skip("insertMany", () => {
      it("should insert 10000 users", async () => {
        const response = await request(app.getHttpServer())
          .post("/users/insertMany")
          .expect(201);
        expect(response.body.message).toBe("ok");
      });
    });
  });
});

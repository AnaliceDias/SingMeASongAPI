import supertest from "supertest";
import app from "../src/app";
import {prisma} from "../src/database"

describe("GET /recommendations/top/:amount" , () => {
    it("Get top recommendations test" , async () => {
        const result = await supertest(app).get("/recommendations/top/10");
        const status = result.status;

        expect(status).toEqual(200);
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});
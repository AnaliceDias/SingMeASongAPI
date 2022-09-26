import supertest from "supertest";
import app from "../src/app";
import {prisma} from "../src/database"
import { correctRecommendation } from "./factories/recommendationsFactory";

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations;`;

    const body = await correctRecommendation();
    await prisma.$executeRaw` INSERT INTO recommendations (name, "youtubeLink") VALUES (${body.name} , ${body.youtubeLink});`;

});

describe("Get tests" , () => {
    it("Get test" , async () => {
        const result = await supertest(app).get("/recommendations");
        const status = result.status;

        expect(status).toEqual(200);
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});
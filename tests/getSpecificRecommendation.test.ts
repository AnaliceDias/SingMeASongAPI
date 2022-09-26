import supertest from "supertest";
import app from "../src/app";
import {prisma} from "../src/database"
import { correctRecommendation } from "./factories/recommendationsFactory";

let idRecommendations = 0;

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations;`;

    const body = await correctRecommendation();
    await prisma.$executeRaw` INSERT INTO recommendations (name, "youtubeLink") VALUES (${body.name} , ${body.youtubeLink});`;
    
    idRecommendations = await prisma.$queryRaw` SELECT id FROM recommendations`;
    idRecommendations = idRecommendations[0].id;
});

describe("Get specific recommendation tests" , () => {
    it("Get specific recommendation test" , async () => {
        const result = await supertest(app).get(`/recommendations/${idRecommendations}`);
        const status = result.status;

        expect(status).toEqual(200);
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});
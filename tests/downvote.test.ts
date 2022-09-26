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

describe("Downvote tests" , () => {
    it("Vote for a non-existent option" , async () => {
        const result = await supertest(app).post("/recommendations/-1/downvote").send()
        const status = result.status;

        expect(status).toEqual(404);
    });

    it("Vote for an existing option" , async () => {
        
        const result = await supertest(app).post(`/recommendations/${idRecommendations}/downvote`).send();
        const status = result.status;

        expect(status).toEqual(200);
    });

    it("Downvote until the option is deleted" , async () => {

        await supertest(app).post(`/recommendations/${idRecommendations}/downvote`).send();
        await supertest(app).post(`/recommendations/${idRecommendations}/downvote`).send();
        await supertest(app).post(`/recommendations/${idRecommendations}/downvote`).send();
        await supertest(app).post(`/recommendations/${idRecommendations}/downvote`).send();
        await supertest(app).post(`/recommendations/${idRecommendations}/downvote`).send();
        await supertest(app).post(`/recommendations/${idRecommendations}/downvote`).send();

        const result = await supertest(app).post(`/recommendations/${idRecommendations}/downvote`).send();
        const status = result.status;

        expect(status).toEqual(404);
    })
});

afterAll(async () => {
    await prisma.$disconnect();
});
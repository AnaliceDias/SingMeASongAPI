import app from "../src/app.js";
import supertest from "supertest";
import {prisma} from "../src/database"
import { correctRecommendation, recommendationMissingSomething, recommendationWithInvalidLink } from "./factories/recommendationsFactory.js";

let nameRecommendation = 0;

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations;`;

    const body = await correctRecommendation();
    await prisma.$executeRaw` INSERT INTO recommendations (name, "youtubeLink") VALUES (${body.name} , ${body.youtubeLink});`;
    
    nameRecommendation = await prisma.$queryRaw` SELECT name FROM recommendations`;
    nameRecommendation = nameRecommendation[0].name;
});

describe("POST /recommendations" , () => {
    it("Missing information" , async () => {
        const body = await recommendationMissingSomething();
        const result = await supertest(app).post("/recommendations").send(body);
        const status = result.status;

        expect(status).toEqual(422);
    })

    it("Submit an invalid link" , async () => {
        const body = await recommendationWithInvalidLink();
        const result = await supertest(app).post("/recommendations").send(body);
        const status = result.status;

        expect(status).toEqual(422);
    })

    it("Submit an existing recommendation " , async () => {
        const body = {
            "name": nameRecommendation ,
            "youtubeLink": "https://www.youtube.com/watch?v=6cqcr_19TDg"
        }
        await supertest(app).post("/recommendations").send(body);
        const result = await supertest(app).post("/recommendations").send(body);
        const status = result.status;

        expect(status).toEqual(409);
    })

    it("Success case" , async () => {
        const body = await correctRecommendation();
        const result = await supertest(app).post("/recommendations").send(body);
        const status = result.status;

        expect(status).toEqual(201);
    })
})

afterAll(async () => {
    await prisma.$disconnect();
});
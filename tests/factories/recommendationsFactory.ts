import {faker} from "@faker-js/faker"

export async function correctRecommendation(){
    const body = {
        "name": faker.lorem.words(2) ,
        "youtubeLink": "https://www.youtube.com/watch?v=6cqcr_19TDg"
    }
    return body;
}

export async function recommendationMissingSomething(){
    const body = {
        "name": "" ,
        "youtubeLink": "https://www.youtube.com/watch?v=6cqcr_19TDg"
    }
    return body;
}

export async function recommendationWithInvalidLink(){
    const body = {
        "name": faker.lorem.word(2) ,
        "youtubeLink": faker.internet.url()
    }
    return body;
}

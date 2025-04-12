import test, { APIRequestContext, APIResponse, expect } from "@playwright/test";
import Logger from "../../utils/Logger";
import { NewPetResponseModel } from "../../models/newPetResponseModel";

export class CheckPetWasCreated {

    private expectedPet: any;

    constructor(expectedPet: any) {
        this.expectedPet = expectedPet;
    }

    public async withInfo(newPetResponse: APIResponse): Promise<void> {
        await test.step('Checking if the pet was created', async () => {
            console.log(JSON.stringify(await newPetResponse.json()));
            const newJsonPetResponse = await newPetResponse.json();
            const newPetResponseModel = newJsonPetResponse as NewPetResponseModel;
            const headers = newPetResponse.headersArray();
            headers.forEach(header => console.log("Name " + header.name + ": Value" + header.value));
            const keepAliveHeader = headers.filter(header => header.name === "Keep-Alive")[0].value;
            console.log("Keep-Alive header value: " + keepAliveHeader);
            expect(newPetResponse.status()).toBe(201);
            expect(newPetResponseModel.status, "The status is not the expected").toBe("success");
            expect(newPetResponseModel.status, "The status is not the expected").toContain("s");
            expect(newPetResponseModel.message, "The message is no the expected").toBe("Pet created");
            expect(newPetResponseModel.data.name, "The name is no the expected").toBe(this.expectedPet.name);
            expect(newPetResponseModel.data.type, "The type is no the expected").toBe(this.expectedPet.type);
            expect(newPetResponseModel.data.age, "The age is no the expected").toBe(this.expectedPet.age);
            expect(newPetResponseModel.data.id, "The id is no the expected").toBeTruthy();
            console.log("status: " + newJsonPetResponse.status);
            console.log("message: " + newJsonPetResponse.message);
            console.log("data type: " + newJsonPetResponse.data.type);
            Logger.error("Error creating pet");
            Logger.info("Pet created successfully");
        });
    }
}
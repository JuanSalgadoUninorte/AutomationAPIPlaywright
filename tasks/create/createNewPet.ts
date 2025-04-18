import test, { APIRequestContext, APIResponse } from "@playwright/test";
import { NewPetRequestModel } from "../../models/newPetRequestModel";

export class CreateNewPet {
  private request: APIRequestContext;
  constructor(request: APIRequestContext) {
    this.request = request;
  }

  public async withInfo(newPetRequest: NewPetRequestModel): Promise<APIResponse> {
    return await test.step(`Creating a new pet ${JSON.stringify(newPetRequest)}`, async () => {
      return await this.request.post('/pets', {
        data: newPetRequest,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',

        }
      });
    });
  }
}
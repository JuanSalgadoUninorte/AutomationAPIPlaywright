import test from '@playwright/test';
import Logger from '../../utils/Logger';
import { CreateNewPet } from '../../tasks/create/createNewPet';
import { CheckPetWasCreated } from '../../tasks/create/checkPetWasCreated';
import { faker } from '@faker-js/faker';
import { NewPetRequestModel } from '../../models/newPetRequestModel';

// test.beforeEach(async ({ request }) => {
//   Logger.info("Starting test to create a new pet");
// });

// test.beforeAll(async ({ request }) => {
//   Logger.info("Runninh before all tests to create a new pet");
// });

test('Must create a new pet', async ({ request }) => {
  const newPetRequest: NewPetRequestModel = {
    name: faker.animal.dog(),
    type: "dog",
    age: 5
  };

  Logger.info("Creating a new pet");

  const createNewPet = new CreateNewPet(request);
  const newPetResponse = await createNewPet.withInfo(newPetRequest);
  const checkPetWasCreated = new CheckPetWasCreated(newPetRequest);
  await checkPetWasCreated.withInfo(newPetResponse);
});

// test.afterAll(async ({ request }) => {
//   Logger.info("Running after all");
// });

// test.afterEach(async ({ request }) => {
//   Logger.info("Test to create a new pet finished");
// });


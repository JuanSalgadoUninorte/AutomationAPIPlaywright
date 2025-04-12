import { test, expect } from '@playwright/test';

test('Must update a pet', async ({ request }) => {

  const newPetRequest = {
    name: "doggie",
    type: "dog",
    age: 5
  };

  const newPetResponse = await request.post('/pets', {
    data: newPetRequest
  });

  const newJsonPetResponse = await newPetResponse.json();
  const petId = newJsonPetResponse.data.id;

  const updatePetRequest = {
    name: "Anakin SkyWauker",
    type: "Jedi Dog",
    age: 2
  };
  const updatePetResponse = await request.put('/pets/'+petId, {
    data: updatePetRequest
  });

  console.log(JSON.stringify(await updatePetResponse.json()));
});

test('Must update partially a pet', async ({ request }) => {

  const newPetRequest = {
    name: "doggie",
    type: "dog",
    age: 5
  };

  const newPetResponse = await request.post('/pets', {
    data: newPetRequest
  });

  const newJsonPetResponse = await newPetResponse.json();
  const petId = newJsonPetResponse.data.id;
  console.log("petId: "+petId);
  const updatePartiallyPetRequest = {
    "age": 29
  };
  const updatePetResponse = await request.patch('/pets/'+petId, {
    data: updatePartiallyPetRequest
  });

  console.log(JSON.stringify(await updatePetResponse.json()));
});

test('Must get a pet by id', async ({ request }) => {

  const newPetRequest = {
    name: "Colonel",
    type: "Bird",
    age: 5
  };

  const newPetResponse = await request.post('/pets', {
    data: newPetRequest
  });

  const newJsonPetResponse = await newPetResponse.json();
  const petId = newJsonPetResponse.data.id;

  const getPetByIdResponse = await request.get('/pets/'+petId);

  console.log("Response ", (await getPetByIdResponse.json()));
});

test('Must get all pets', async ({ request }) => {

  const getAllPetsResponse = await request.get('/pets');

  console.log("Response ", (await getAllPetsResponse.json()));
});

test('Must do basic auth', async ({ request }) => {
  const credentialsBase64 = btoa('admin:password123');
  const basicAuthenticationResponse = await request.get('/protected-basic', {
    headers: {
      //Authorization: Basic YWRtaW46cGFzc3dvcmQxMjM=
      //Authorization: 'Basic ' + Buffer.from('admin:password123').toString('base64')
      Authorization: `Basic ${credentialsBase64}`
    }
  });

  console.log("Response ", (await basicAuthenticationResponse.status()));
  console.log("Response ", (await basicAuthenticationResponse.text()));
});

test('Must do Bearer auth', async ({ request }) => {
  const authenticationTokenResponse = await request.post('/login', {
    data: {
      "username": "automation"
    }
  });

  const jsonResponse = await authenticationTokenResponse.json();
  const token = jsonResponse.data.accessToken;
  console.log(`Token: ${token}`);

  const bearerResponse = await request.get('/protected-bearer', {
    headers: {
      'authorization': 'Bearer ' + token
    }
  });
  console.log("Response ", (await bearerResponse.status()));
  expect(await bearerResponse.status()).toBe(200);
  expect(await bearerResponse.text()).toBe("Hello automation, you have accessed a protected endpoint!");
});
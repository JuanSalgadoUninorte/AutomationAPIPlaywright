import test from '@playwright/test';

test('Must delete a pet', async ({ request }) => {

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

  const deletePetResponse = await request.delete('/pets/'+petId);

  console.log(JSON.stringify(deletePetResponse.status()));
});
import request from "supertest"
import { app } from "../index" // Zaimportuj swoje API

it("Powinno zwrócić status 200", async () => {
  const response = await request(app)
    .get("/")
    .set("Authorization", "pss-this-is-my-secret") // Zastąp '/endpoint' swoją trasą GET
  console.log(response.)

  expect(response.status).toBe(200)
})

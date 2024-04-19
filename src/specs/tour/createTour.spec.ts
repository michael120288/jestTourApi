import * as supertest from "supertest";
import { user } from "../../data/user";
const request = supertest("localhost:8001/api/v1");
import { deleteFunction, login, signUp } from "../../data/helpers";
import { tour } from "../../data/tour";

let cookie: [x: string];
describe("TOUR", () => {
  it("create Tour", async () => {
    await signUp(user).then((res) => {
      expect(res.statusCode).toBe(201);
      expect(res.body.data.user.email).toBe(user.email);
      cookie = res.header["set-cookie"];
      // console.log(cookie);
    });
    tour.startDates = null;
    await request
      .post("/tours")
      .set("Cookie", cookie)
      .send(tour)
      .then((res) => {
        console.log(res.body.data,'=====================');
      });
  });
});


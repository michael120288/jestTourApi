import * as supertest from "supertest";
const request = supertest("localhost:8001/api/v1");
//const request = supertest("/");
import { user } from "../data/user";
describe("USER SIGN UP", () => {
  describe("POSITIVE TESTING", () => {
    it.skip("create new user", async () => {
      const res = await request
        .post("/users/signup")
        .send({
          name: "MichaelS",
          email: "michael2@gmail.com",
          password: "12345678",
          passwordConfirm: "12345678",
        })
        .expect(201);
      console.log(res.body);
      expect(res.body.data.user.name).toBe("MichaelS");
      expect(typeof res.body.data.user.name).toBe("string");
      expect(res.body.data.user.email).toBe("michael2@gmail.com");
      expect(res.body.token).toBeDefined();
      expect(typeof res.body.token).toBe("string");
    });
    it("create new user with imported data", async () => {
      const res = await request.post("/users/signup").send(user).expect(201);
      console.log(res.body, "==================");
      expect(res.body.data.user.name).toBe(user.name);
      expect(res.body.data.user.email).toBe(user.email);
      expect(res.body.token).toBeDefined();
      expect(typeof res.body.token).toBe("string");
    });
  });
  describe.only("NEGATIVE TESTING", () => {
    it("should not create new user with the same email", async () => {
      await request.post("/users/signup").send(user).expect(201);
      await request
        .post("/users/signup")
        .send(user)
        .then((resp) => {
          console.log(
            resp.body,
            "================================================================"
          );
          console.log(
            user.email,
            "==============================email=================================="
          );
          expect(resp.body.message).toBe(
            `E11000 duplicate key error collection: test.users index: email_1 dup key: { email: "${user.email}" }`
          );
        });
    });
    it("should not create new user with deleted name field", async () => {
      await request
        .post("/users/signup")
        .send({
          email: user.email,
          password: user.password,
          passwordConfirm: user.password,
        })
        .then((el) => {
          console.log(el, "el");
        });
    });
  });
});

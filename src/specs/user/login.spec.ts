import * as supertest from "supertest";
const request = supertest("localhost:8001/api/v1");
import  {user}  from "../../data/user";
import { deleteFunction, login, signUp } from "../../data/helpers";


describe("USER SIGNUP AND LOGIN", () => {
  describe("POSITIVE", () => {
    let cookie: [x: string];
    it("login user with delete request", async () => {
      await signUp(user).then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body.data.user.email).toEqual(user.email);
      });
      cookie = await login(user).then((el) => {
        expect(el.statusCode).toBe(200);
        return el.header["set-cookie"];
      });
      await deleteFunction(cookie).then((el) => {
        expect(el.statusCode).toBe(204);
      });
      await login(user).then((el) => {
        expect(el.statusCode).toBe(401);
      });
    });
    it("login user with delete request", async () => {
      const userRes = await signUp(user);
      expect(userRes.statusCode).toBe(201);
      expect(userRes.body.data.user.email).toEqual(user.email);

      const userLogin = await login(user);
      expect(userLogin.statusCode).toBe(200);
      cookie = userLogin.header["set-cookie"];

      const deleteUser = await deleteFunction(cookie);
      expect(deleteUser.statusCode).toBe(204);

      const userLoginAfter = await login(user);
      expect(userLoginAfter.statusCode).toBe(401);
    });
  });
  describe.only("NEGATIVE", () => {
    let cookie: [x: string];
    beforeEach(async () => {
      await signUp(user).then((res) => {
        expect(res.statusCode).toEqual(201);
        expect(res.body.data.user.email).toEqual(user.email);
        expect(res.body.data.user.name).toEqual(user.name);
        expect(res.body.data.user.role).toEqual("user");
        expect(res.body.token).toBeDefined();
        cookie = res.header["set-cookie"];
      });
    });
    afterEach(async () => {
      await deleteFunction(cookie).then((el) => {
        expect(el.statusCode).toBe(204);
        expect(el.body).toEqual({});
      });
    });
    it("user cannot login with invalid credentials", async () => {
      await login({
        email: user.email + "1",
        password: user.password + "1",
      }).then((el) => {
        console.log(el.body, "======el=========");
        expect(el.statusCode).toBe(401);
      });
    });
    it.only("user cannot login with invalid credentials", (done) => {
      request
        .post("/users/login")
        .send({ email: user.email, password: user.password })
        .end((err, res) => {
          if (err) done(err);
          console.log(res.body, "======el=========");
          expect(res.statusCode).toBe(401);
          done();
        });
    });
  });
});
//email michael@gmail.com + '1' = michael@gmail.com1
//email 123556=78 + '1' = 123556=781

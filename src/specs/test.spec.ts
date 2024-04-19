import * as supertest from "supertest";
const request = supertest("localhost:8001/api/v1");
import { data } from "../data/helpers";

describe("Describe", () => {
  // it("Login - No async - await 3 - not working!!!", (done) => {
  //   let isUserCreated = false;
  //   request
  //     .post("/users/signup")
  //     .send({
  //       name: "John Doe",
  //       email: "john22@hotmail.com",
  //       password: "12345678",
  //       passwordConfirm: "12345678",
  //     })
  //     .end((err, res) => {
  //       request
  //         .post("/users/login")
  //         .send({ email: "john22@hotmail.com", password: "12345678" })
  //         .end((err, res) => {
  //           if (err) return done(err)
  //           done();
  //         });
  //     });
  // });


  it("Login - No async - await 3 - not working!!!", (done) => {

    const array = [1, 2, 3, 4, 5];

    array.forEach((el) => {
      console.log(el);
    })


  });
});

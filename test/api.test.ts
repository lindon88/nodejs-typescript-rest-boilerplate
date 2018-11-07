import app from "../app/app";
import chai = require("chai");
import chaiHttp = require("chai-http");
import "mocha";

chai.use(chaiHttp);
const expect = chai.expect;

describe("TEST API REQUEST", () => {
    it("should return response an call", () => {
        return chai.request(app).get("/api/test")
            .then((res) => {
                chai.expect(res.body).to.eql({});
            });
    });
})

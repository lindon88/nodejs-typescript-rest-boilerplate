import chai = require("chai");
import chaiHttp = require("chai-http");
import "mocha";
import Application from "../core/application";

chai.use(chaiHttp);
const expect = chai.expect;
const app = Application.getServer();

// test creating person
describe("Create new person test", () => {
    it("should return message", () => {
        return chai.request(app).post("/example/person/create")
            .send({
                first_name: "Barry",
                last_name: "Allen",
                email: "barry.allen@flashteam.com",
                gender: "male",
                birth_date: "1989-03-19",
            })
            .then((res) => {
                chai.expect(res.body).to.eql({});
            });
    });
});

// test updating person
describe("Update existing person test", () => {
    it("should return message", () => {
        return chai.request(app).post("/example/person/update")
            .send(
                {
                    id: 1,
                    first_name: "Anjamen",
                    last_name: "Ciroz",
                    email: "nemanja.zoric1.nz@gmail.com",
                },
            ).then((res) => {
                chai.expect(res.body).to.eql({});
            });
    });
});

// test deleting person
describe("Delete existing person test", () => {
    it("should return message", () => {
        return chai.request(app).del("/example/person/delete/1")
            .then((res) => {
                chai.expect(res.body).to.eql({});
            });
    });
});

// test returning all persons
describe("Returns all persons", () => {
    it("should return response data", () => {
        return chai.request(app).get("/example/person/all")
            .then((res) => {
                chai.expect(res.body).to.eql({});
            });
    });
});

// test returning specific person
describe("Returns specific person", () => {
    it("should return response data", () => {
        return chai.request(app).get("/example/person/1")
            .then((res) => {
                chai.expect(res.body).to.eql({});
            });
    });
});

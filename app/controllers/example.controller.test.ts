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

// test creating animals
describe("Create new animal test", () => {
    it("should return message", () => {
        return chai.request(app).post("/example/animal/create")
            .send({
                name: "gorilla",
            })
            .then((res) => {
                chai.expect(res.body).to.eql({});
            });
    });
});

// test updating animals
describe("Update existing animal test", () => {
    it("should return message", () => {
        return chai.request(app).post("/example/animal/update")
            .send({
                id: 1,
                name: "gorilla",
            })
            .then((res) => {
                chai.expect(res.body).to.eql({});
            });
    });
});

// test deleting animal
describe("Delete existing animal test", () => {
    it("should return message", () => {
        return chai.request(app).del("/example/animal/delete/1")
            .then((res) => {
                chai.expect(res.body).to.eql({});
            });
    });
});

// test reading all animals
describe("Read all animals", () => {
    it("should return response data", () => {
        return chai.request(app).get("/example/animal/all")
            .then((res) => {
                chai.expect(res.body).to.eql({});
            });
    });
});

// test reading specific animal
describe("Read specific animal", () => {
    it("should return response data", () => {
        return chai.request(app).get("/example/animal/1")
            .then((res) => {
                chai.expect(res.body).to.eql({});
            });
    });
});

// test creating new pet
describe("Create new pet test", () => {
    it("should return message", () => {
        return chai.request(app).post("/example/pet/create")
            .send({
                animal_id: 1,
                name: "Grodd",
                age: 1,
            })
            .then((res) => {
                chai.expect(res.body).to.eql({});
            });
    });
});

// test updating existing pet
describe("Update existing pet test", () => {
    it("should return message", () => {
        return chai.request(app).post("/example/pet/update")
            .send({
                name: "Grodd",
                age: 2,
            })
            .then((res) => {
                chai.expect(res.body).to.eql({});
            });
    });
});

// test deleting existing pet
describe("Delete existing pet test", () => {
    it("should return message", () => {
        return chai.request(app).del("/example/pet/delete/1")
            .then((res) => {
                chai.expect(res.body).to.eql({});
            });
    });
});

// test reading all pets
describe("Read all pets test", () => {
    it("should return response data", () => {
        return chai.request(app).get("/example/pet/all")
            .then((res) => {
                chai.expect(res.body).to.eql({});
            });
    });
});

// test reading specific pet
describe("Read specific pet", () => {
    it("should return response data", () => {
        return chai.request(app).get("/example/pet/1")
            .then((res) => {
                chai.expect(res.body).to.eql({});
            });
    });
});

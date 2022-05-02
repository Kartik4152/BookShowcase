import chai from "chai";
import chaiHttp from "chai-http";
import app from "./index";

chai.use(chaiHttp);
chai.should();

describe("Books", () => {
  describe("GET /books", () => {
    it("get all books in the catalogue", (done) => {
      chai
        .request(app)
        .get("/books")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
    it("to get a single book", (done) => {
      chai
        .request(app)
        .get("/books/9h3WlElDEcyjMBskgRNl")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("title", "Felix Ever After");
          done();
        });
    });
  });
});

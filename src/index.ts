import express from "express";
import { config } from "dotenv";
import { GetCandidatesController } from "./controllers/get-candidates/get-candidates";
import { MongoGetCandidatesRepository } from "./repositories/get-candidates/mongo-get-candidates";
import { MongoClient } from "./database/mongo";
import { MongoCreateCandidateRepository } from "./repositories/create-candidate/mongo-create-candidate";
import { CreateCandidateController } from "./controllers/create-candidate/create-candidate";

const main = async () => {
  config();

  const app = express();

  app.use(express.json());

  await MongoClient.connect();

  app.get("/candidates", async (req, res) => {
    const mongoGetCandidatesRepository = new MongoGetCandidatesRepository();
    const getCandidatesController = new GetCandidatesController(
      mongoGetCandidatesRepository
    );

    const { body, statusCode } = await getCandidatesController.handle({
      params: req.query,
    });

    res.send(body).status(statusCode);
  });

  app.post("/candidates", async (req, res) => {
    const mongoCreateCandidateRepository = new MongoCreateCandidateRepository();

    const createCandidateController = new CreateCandidateController(
      mongoCreateCandidateRepository
    );

    const { body, statusCode } = await createCandidateController.handle({
      body: req.body,
    });

    res.send(body).status(statusCode);
  });

  const port = process.env.PORT || 8000;

  app.listen(port, () => console.log(`listening on port ${port}`));
};

main();

import express from "express";
import { config } from "dotenv";
import { GetCandidatesController } from "./controllers/get-candidates/get-candidates";
import { MongoGetCandidatesRepository } from "./repositories/get-candidates/mongo-get-candidates";
import { MongoClient } from "./database/mongo";

const main = async () => {
  config();

  const app = express();

  await MongoClient.connect();

  app.get("/candidates", async (req, res) => {
    const mongoGetCandidatesRepository = new MongoGetCandidatesRepository();
    const getCandidatesController = new GetCandidatesController(
      mongoGetCandidatesRepository
    );

    const { body, statusCode } = await getCandidatesController.handle();

    res.send(body).status(statusCode);
  });

  const port = process.env.PORT || 8000;

  app.listen(port, () => console.log(`listening on port ${port}`));
};

main();

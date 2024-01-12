import {
  CreateCandidateParams,
  ICreateCandidateRepository,
} from "../../controllers/create-candidate/protocols";
import { MongoClient } from "../../database/mongo";
import { Candidate } from "../../models/candidate";

export class MongoCreateCandidateRepository
  implements ICreateCandidateRepository
{
  async createCandidate(params: CreateCandidateParams): Promise<Candidate> {
    const response = await MongoClient.db
      .collection<Omit<Candidate, "id">>("candidates")
      .insertOne(params);

    const candidate = await MongoClient.db
      .collection<Omit<Candidate, "id">>("candidates")
      .findOne({ _id: response.insertedId });

    if (!candidate) {
      throw new Error("User cannot be created");
    }

    const { _id, ...rest } = candidate;

    return { id: _id.toHexString(), ...rest };
  }
}

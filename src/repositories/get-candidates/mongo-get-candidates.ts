import { IGetCandidatesRepository } from "../../controllers/get-candidates/protocols";
import { MongoClient } from "../../database/mongo";
import { Candidate } from "../../models/candidate";

export class MongoGetCandidatesRepository implements IGetCandidatesRepository {
  async getCandidates(): Promise<Candidate[]> {
    const candidates = await MongoClient.db
      .collection<Omit<Candidate, "id">>("candidates")
      .find({})
      .toArray();

    return candidates.map(({ _id, ...candidate }) => ({
      ...candidate,
      id: _id.toHexString(),
    }));
  }
}

import { IGetCandidatesRepository } from "../../controllers/get-candidates/protocols";
import { Candidate } from "../../models/candidate";

export class MongoGetCandidatesRepository implements IGetCandidatesRepository {
  async getCandidates(): Promise<Candidate[]> {
    return [
      {
        name: "Karine Araujo",
        skills: ["React", "NodeJS", "Golang"],
      },
    ];
  }
}

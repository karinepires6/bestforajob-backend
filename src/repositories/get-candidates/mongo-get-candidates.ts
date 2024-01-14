import { IGetCandidatesRepository } from "../../controllers/get-candidates/protocols";
import { MongoClient } from "../../database/mongo";
import { Candidate } from "../../models/candidate";

export class MongoGetCandidatesRepository implements IGetCandidatesRepository {
  async getCandidates(skills: string[]): Promise<Candidate[]> {
    let candidates;
    if (skills) {
      const pipeline = [
        {
          $project: {
            name: 1,
            skills: 1,
            matchingSkillsCount: {
              $size: {
                $filter: {
                  input: "$skills",
                  as: "skill",
                  cond: { $in: ["$$skill", skills] },
                },
              },
            },
          },
        },
        {
          $sort: { matchingSkillsCount: -1 },
        },
        {
          $limit: 1,
        },
      ];

      candidates = await MongoClient.db
        .collection<Omit<Candidate, "id">>("candidates")
        .aggregate(pipeline)
        .toArray();
    } else {
      candidates = await MongoClient.db
        .collection<Omit<Candidate, "id">>("candidates")
        .find({})
        .toArray();
    }

    return candidates.map((candidate) => ({
      id: candidate._id.toHexString(),
      name: candidate.name,
      skills: candidate.skills,
    }));
  }
}

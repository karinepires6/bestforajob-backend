import { Candidate } from "../../models/candidate";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  CreateCandidateParams,
  ICreateCandidateController,
  ICreateCandidateRepository,
} from "./protocols";

export class CreateCandidateController implements ICreateCandidateController {
  constructor(
    private readonly createCandidateRepository: ICreateCandidateRepository
  ) {}

  async handle(
    httpRequest: HttpRequest<CreateCandidateParams>
  ): Promise<HttpResponse<Candidate>> {
    try {
      if (!httpRequest.body) {
        return {
          statusCode: 400,
          body: "Body is required",
        };
      }

      const candidate = await this.createCandidateRepository.createCandidate(
        httpRequest.body
      );

      return {
        statusCode: 201,
        body: candidate,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}

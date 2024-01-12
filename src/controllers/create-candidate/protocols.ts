import { Candidate } from "../../models/candidate";
import { HttpRequest, HttpResponse } from "../protocols";

export interface ICreateCandidateController {
  handle(
    httpRequest: HttpRequest<CreateCandidateParams>
  ): Promise<HttpResponse<Candidate>>;
}

export interface CreateCandidateParams {
  name: string;
  skills: string[];
}

export interface ICreateCandidateRepository {
  createCandidate(params: CreateCandidateParams): Promise<Candidate>;
}

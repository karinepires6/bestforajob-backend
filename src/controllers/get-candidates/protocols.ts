import { Candidate } from "../../models/candidate";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IGetCandidatesController {
  handle(
    httpRequest: HttpRequest<GetCandidatesParams>
  ): Promise<HttpResponse<Candidate[]>>;
}

export interface GetCandidatesParams {
  skills: string;
}

export interface IGetCandidatesRepository {
  getCandidates(skills?: string[]): Promise<Candidate[]>;
}

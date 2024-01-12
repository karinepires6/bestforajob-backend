import { Candidate } from "../../models/candidate";
import { HttpResponse } from "../protocols";

export interface IGetCandidatesController {
  handle(): Promise<HttpResponse<Candidate[]>>;
}

export interface IGetCandidatesRepository {
  getCandidates(): Promise<Candidate[]>;
}

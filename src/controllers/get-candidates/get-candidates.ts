import { HttpRequest } from "../protocols";
import {
  GetCandidatesParams,
  IGetCandidatesController,
  IGetCandidatesRepository,
} from "./protocols";

export class GetCandidatesController implements IGetCandidatesController {
  getCandidatesRepository: IGetCandidatesRepository;

  constructor(getCandidatesRepository: IGetCandidatesRepository) {
    this.getCandidatesRepository = getCandidatesRepository;
  }

  async handle(httpRequest: HttpRequest<GetCandidatesParams>) {
    try {
      if (!httpRequest.params.skills) {
        return {
          statusCode: 200,
          body: await this.getCandidatesRepository.getCandidates(),
        };
      }

      const candidates = await this.getCandidatesRepository.getCandidates(
        httpRequest.params.skills.split(",")
      );

      if (!candidates.length) {
        return {
          statusCode: 404,
          body: [],
        };
      }

      return {
        statusCode: 200,
        body: candidates,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: [],
      };
    }
  }
}

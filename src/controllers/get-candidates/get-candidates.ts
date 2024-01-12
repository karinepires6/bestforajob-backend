import {
  IGetCandidatesController,
  IGetCandidatesRepository,
} from "./protocols";

export class GetCandidatesController implements IGetCandidatesController {
  getCandidatesRepository: IGetCandidatesRepository;

  constructor(getCandidatesRepository: IGetCandidatesRepository) {
    this.getCandidatesRepository = getCandidatesRepository;
  }

  async handle() {
    try {
      const candidates = await this.getCandidatesRepository.getCandidates();

      return {
        statusCode: 200,
        body: candidates,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong.",
      };
    }
  }
}

import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  private feedbacksRepository: FeedbacksRepository;

  constructor(feedbacksRepository: FeedbacksRepository) {
    this.feedbacksRepository = feedbacksRepository;
  }

  async execute(data: SubmitFeedbackUseCaseRequest): Promise<void> {
    const { type, comment, screenshot } = data;

    if(!type) {
      throw new Error("Type is required");
    }

    if(!comment) {
      throw new Error("Comment is required");
    }
    
    if(screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Invalid screenshot format.");
    }
    
    await this.feedbacksRepository.create({ type, comment, screenshot });
  }
}

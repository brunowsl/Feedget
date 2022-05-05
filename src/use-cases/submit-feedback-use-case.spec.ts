import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

// adiciona um espião nos testes
const createFeedbackSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase({
  //espião para o método create
  create: createFeedbackSpy,
});

describe("SubmitFeedbackUseCase", () => {
  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "example comment",
        screenshot: "data:image/png;base64,8ajsdafbjalsdj86",
      })
    ).resolves.not.toThrow();

    // verifica se o metodo de criar feedback foi chamado
    expect(createFeedbackSpy).toHaveBeenCalled();
  });
});

describe("SubmitFeedbackUseCase", () => {
  it("should not be able to submit a feedback without a type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "example comment",
        screenshot: "data:image/png;base64,8ajsdafbjalsdj86",
      })
    ).rejects.toThrow();
  });
});

describe("SubmitFeedbackUseCase", () => {
  it("should not be able to submit a feedback without a comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64,8ajsdafbjalsdj86",
      })
    ).rejects.toThrow();
  });
});

describe("SubmitFeedbackUseCase", () => {
  it("should not be able to submit a feedback with an invalid screenshot", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "example comment",
        screenshot: "8ajsdafbjalsdj86",
      })
    ).rejects.toThrow();
  });
});

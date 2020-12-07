export default interface MaliciousJudgementUseCaseInputPort<T> {
    judgement(): Promise<T>;
}
interface CheckServiceInterface {
  execute(url: string): Promise<boolean>;
}

type SuccesCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceInterface {
  constructor(
    private readonly successCallback: SuccesCallback,
    private readonly errorCallback: ErrorCallback,
  ) {}
  async execute(url: string): Promise<boolean> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error on service check: ${url}`);
      }
      this.successCallback();
      return true;
    } catch (error) {
      this.errorCallback(`${error}`);
      return false;
    }
  }
}

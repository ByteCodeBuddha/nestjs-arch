import { Injectable } from '@nestjs/common';

@Injectable()
export class RequestParamsProvider {
  private ip: string;
  private userAgent: string | undefined;

  setIP(ip: string): void {
    this.ip = ip;
  }

  getIP(): string {
    return this.ip;
  }

  setUserAgent(
    userAgent: string | undefined,
  ): void {
    this.userAgent = userAgent;
  }

  getUserAgent(): string | undefined {
    return this.userAgent;
  }
}

export class UserSessionDto {
  userId: number;
  token: string;
  ip: string;
  userAgent: string | undefined;
}

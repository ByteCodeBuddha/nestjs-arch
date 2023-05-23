import { Expose } from 'class-transformer';

export class GetAllUsers {
  @Expose()
  id: number;

  @Expose()
  email: string;

  constructor(partial: Partial<GetAllUsers>) {
    Object.assign(this, partial);
  }
}

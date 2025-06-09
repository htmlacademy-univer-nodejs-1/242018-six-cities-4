import { Expose } from 'class-transformer';

export class Coordinates {
  @Expose()
  public latitude: number;

  @Expose()
  public longitude: number;
}

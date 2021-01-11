export type ConversionRequest = Omit<Conversion, 'status'>;

export interface Conversion {
  input: string;
  convertTo: string;
  status: ConversionStatus;
  id: number;
}

export enum ConversionStatus {
  Waiting,
  Processing,
  Complete,
  Failed,
}

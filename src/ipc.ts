import { OpenDialogOptions } from "electron";

export interface ToMainChannels {
  showOpenDialog: (options?: OpenDialogOptions) => Promise<string[]>;
  showFileInBrowser: (file: string) => void;
  pushToQueue: (files: string[], convertTo: FileConversionOptions) => void;
  getProgress: () => FileConversion[];
}

export enum FileConversionStatus {
  Waiting,
  Processing,
  Complete,
  Failed,
}

export interface FileConversionRequest {
  /**
   * The full path to the file that should be converted
   */
  originalPath: string;
  options: FileConversionOptions;
}

export interface FileConversion {
  id: number;
  originalPath: string;
  newPath: string;
  outputOptions: FileConversionOptions;
  status: FileConversionStatus;
  progressPercentage: number;
  errorMessage?: string;
}

export interface FileConversionOptions {
  /**
   * The file type to convert to (without the dot). For example, "mp3"
   */
  ext: string;
  
  /**
   * The file codec to convert to. For example, "alac" for apple lossless codec
   */
  codec?: string;

  /**
   * Whether to copy track metadata
   */
  copyMetadata?: boolean;
}

export interface ToRendererChannels {
  updateProgress: (files: FileConversion[]) => void;
}

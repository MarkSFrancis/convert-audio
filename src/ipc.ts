import { OpenDialogOptions } from "electron";

export interface ToMainChannels {
  showOpenDialog: (options?: OpenDialogOptions) => Promise<string[]>;
  showFileInBrowser: (file: string) => void;
  pushToQueue: (files: string[], convertTo: string) => void;
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
  /**
   * The file type to convert to (without the dot). For example, "mp3"
   */
  convertTo: string;
}

export interface FileConversion {
  id: number;
  originalPath: string;
  newPath: string;
  status: FileConversionStatus;
  progressPercentage: number;
  errorMessage?: string;
}

export interface ToRendererChannels {
  updateProgress: (files: FileConversion[]) => void;
}

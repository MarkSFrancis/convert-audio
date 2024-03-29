import ffmpeg from "fluent-ffmpeg";
import { FileConversionOptions } from "../../ipc";

export interface ConversionEvents {
  progress?: (percentage: number) => void;
  success?: () => void;
  error?: (err: Error) => void;
  complete?: () => void;
}

export function convertFile(
  input: string,
  output: string,
  options: FileConversionOptions,
  events?: ConversionEvents
) {
  return new Promise<void>((resolve, reject) => {
    let command = ffmpeg(input)
      .output(output)
      .addOption("-vn")
      .on("error", (err) => reject(err))
      .on("end", () => resolve())
      .on("progress", (progress) => events?.progress?.(progress.percent));

    if (options.codec) {
      command = command.audioCodec(options.codec);
    }

    if (options.copyMetadata) {
      command = command.addOption("-map_metadata", "0:s:0");
    }

    if (options.bitrate) {
      command = command.audioBitrate(options.bitrate);
    }

    command.run();
  });
}

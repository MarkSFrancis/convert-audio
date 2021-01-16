import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";

ffmpeg.setFfmpegPath(ffmpegPath);

export interface ConversionEvents {
  progress?: (percentage: number) => void;
  success?: () => void;
  error?: (err: Error) => void;
  complete?: () => void;
}

export function convertFile(
  input: string,
  output: string,
  events?: ConversionEvents
) {
  return new Promise<void>((resolve, reject) => {
    const command = ffmpeg(input)
      .output(output)
      .addOption("-vn", "-map_metadata", "0:s:0")
      .on("error", (err) => reject(err))
      .on("end", () => resolve())
      .on("progress", (progress) => events?.progress?.(progress.percent));

    command.run();
  });
}

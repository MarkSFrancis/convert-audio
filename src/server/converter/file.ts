import ffmpegPath from "ffmpeg-static";
import { spawn } from "child_process";
import { join, basename, extname, dirname } from "path";

function executeFfmpeg(input: string, args: string[], output: string) {
  const proc = spawn(
    ffmpegPath,
    ["-i", join(process.cwd(), input), "-y", ...args, output],
    {
      stdio: "inherit",
    }
  );

  return new Promise<void>((resolve, reject) => {
    proc.on("close", (code) => {
      if (code !== 0) {
        reject();
      } else {
        resolve();
      }
    });
  });
}

export function convertFile(input: string, convertTo: string) {
  const outputFilename = `${basename(input, extname(input))}.${convertTo}`;
  const outputFolder = dirname(input);
  const output = join(outputFilename, outputFolder);

  return executeFfmpeg(input, ["-vn", "-map_metadata 0:s:0"], output);
}

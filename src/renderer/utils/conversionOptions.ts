import { FileConversionOptions } from "../../ipc";

export type ConversionOptions =
  | { key: string; ext?: string; codec?: string }
  | string;

export const supportedOptions: ConversionOptions[] = [
  "aac",
  "flac",
  "flv",
  {
    key: "m4a (lossy)",
    ext: "m4a",
  },
  {
    key: "m4a (lossless)",
    ext: "m4a",
    codec: "alac",
  },
  "mp3",
  "ogg",
  "opus",
  "wav",
  "webm",
];

export function findConvertionOptionById(setting: string) {
  return supportedOptions.find(
    (o) => o === setting || (typeof o !== "string" && o.key === setting)
  );
}

export function getConversionOptionId(option: ConversionOptions) {
  return typeof option === "string" ? option : option.key;
}

export function toFileConversionOptions(
  options: ConversionOptions
): FileConversionOptions {
  if (typeof options === "string") {
    return {
      ext: options,
      copyMetadata: true,
    };
  } else {
    return {
      ext: options.ext,
      codec: options.codec,
      copyMetadata: true,
    };
  }
}

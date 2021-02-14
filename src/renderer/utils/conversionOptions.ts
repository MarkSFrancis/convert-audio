import { FileConversionOptions } from "../../ipc";

export type ConversionOptions = { key: string } & FileConversionOptions;

export const supportedOptions: ConversionOptions[] = [
  {
    key: "aac",
    ext: "aac",
    bitrate: "320k",
    copyMetadata: true,
  },
  {
    key: "flac",
    ext: "flac",
    copyMetadata: true,
  },
  {
    key: "m4a (lossy)",
    ext: "m4a",
    bitrate: "320k",
    copyMetadata: true,
  },
  {
    key: "m4a (lossless)",
    ext: "m4a",
    codec: "alac",
    copyMetadata: true,
  },
  {
    key: "mp3",
    ext: "mp3",
    bitrate: "320k",
    copyMetadata: true,
  },
  {
    key: "ogg",
    ext: "ogg",
    bitrate: "320k",
    copyMetadata: true,
  },
  {
    key: "opus",
    ext: "opus",
    bitrate: "320k",
    copyMetadata: true,
  },
  {
    key: "wav",
    ext: "wav",
  },
  {
    key: "webm",
    ext: "webm",
    bitrate: "320k",
    copyMetadata: true,
  },
];

export function findConvertionOptionById(setting: string) {
  return supportedOptions.find((o) => o.key === setting);
}

export function getConversionOptionId(option: ConversionOptions) {
  return typeof option === "string" ? option : option.key;
}

export function toFileConversionOptions(
  options: ConversionOptions
): FileConversionOptions {
  return options;
}

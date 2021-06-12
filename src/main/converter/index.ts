import { convertFile } from "./file";
import { addToQueue, getQueue } from "./queue";
import {
  FileConversionStatus,
  FileConversionRequest,
  FileConversion,
} from "../../ipc";
import { basename, extname, dirname, join } from "path";
import { triggerInAllRenderers } from "../ipc";
import { existsSync } from "fs";

function getOutputFilename(conversion: FileConversionRequest) {
  const filenameWithoutExt = basename(
    conversion.originalPath,
    extname(conversion.originalPath)
  );

  let outputFilename = `${filenameWithoutExt}.${conversion.options.ext}`;

  // If file exists, use "MyFile (2).mp3" style file names
  for (let count = 2; existsSync(outputFilename); count++) {
    outputFilename = `${filenameWithoutExt} (${count}).${conversion.options.ext}`;
  }

  const outputFolder = dirname(conversion.originalPath);
  const outputPath = join(outputFolder, outputFilename);
  return outputPath;
}

export function convert(conversion: FileConversionRequest) {
  const newPath = getOutputFilename(conversion);

  const queueEntry: FileConversion = {
    id: Math.random(),
    originalPath: conversion.originalPath,
    progressPercentage: 0,
    status: FileConversionStatus.Waiting,
    newPath,
    outputOptions: conversion.options,
  };

  addToQueue(queueEntry);
  checkQueue();
}

function checkQueue() {
  const queue = getQueue();
  const processingCount = queue.filter(
    (q) => q.status === FileConversionStatus.Processing
  ).length;

  // Max queue size
  if (processingCount >= 8) return;

  const next = queue.find((q) => q.status === FileConversionStatus.Waiting);

  if (!next) {
    // No files waiting
    return;
  }

  processNext(next);
}

function updateUi() {
  triggerInAllRenderers("updateProgress", getQueue());
}

function processNext(next: FileConversion) {
  next.progressPercentage = 0;
  next.status = FileConversionStatus.Processing;

  convertFile(next.originalPath, next.newPath, next.outputOptions, {
    progress: (percentage) => {
      next.progressPercentage = percentage;
      updateUi();
    },
  })
    .then(() => {
      next.status = FileConversionStatus.Complete;
      next.progressPercentage = 100;
      updateUi();
    })
    .catch((ex: Error) => {
      console.error("Conversion failed");
      console.error(ex);
      next.status = FileConversionStatus.Failed;
      next.errorMessage = ex.message;
      updateUi();
    })
    .finally(() => {
      checkQueue();
    });

  updateUi();
}

import { convertFile } from "./file";
import { addToQueue, getQueue } from "./queue";
import {
  FileConversionStatus,
  FileConversionRequest,
  FileConversion,
} from "../../ipc";
import { basename, extname, dirname, join } from "path";
import { triggerInAllRenderers } from "../ipc";

function getOutputFilename(conversion: FileConversionRequest) {
  const outputFilename = `${basename(
    conversion.originalPath,
    extname(conversion.originalPath)
  )}.${conversion.convertTo}`;

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

  convertFile(next.originalPath, next.newPath, {
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

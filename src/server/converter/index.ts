import { convertFile } from "./file";
import { addToQueue, getQueue } from "./queue";
import { Conversion, ConversionRequest, ConversionStatus } from "./types";

export function convert(conversion: ConversionRequest) {
  const queueEntry: Conversion = {
    ...conversion,
    status: ConversionStatus.Waiting,
  };

  addToQueue(queueEntry);
  checkQueue();
}

function checkQueue() {
  const queue = getQueue();
  const processingCount = queue.filter(
    (q) => q.status === ConversionStatus.Processing
  ).length;

  if (processingCount < 4) {
    const next = queue.find((q) => q.status === ConversionStatus.Waiting);
    processNext(next);
  }
}

function processNext(next: Conversion) {
  convertFile(next.input, next.convertTo)
    .then(() => {
      next.status = ConversionStatus.Complete;
    })
    .catch((ex) => {
      console.error(ex);
      next.status = ConversionStatus.Failed;
    })
    .finally(() => {
      checkQueue();
    });
}

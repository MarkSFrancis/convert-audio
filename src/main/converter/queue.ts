import { FileConversion } from "../../ipc";

let conversionQueue: FileConversion[] = [];

export function addToQueue(conversion: FileConversion) {
  conversionQueue = [...conversionQueue, conversion];
}

export function removeFromQueue(conversion: FileConversion) {
  conversionQueue = conversionQueue.filter((q) => q !== conversion);
}

export function totalInQueue() {
  return conversionQueue.length;
}

export function getQueue() {
  return [...conversionQueue];
}

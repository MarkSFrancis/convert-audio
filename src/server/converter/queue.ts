import { Conversion, ConversionStatus } from "./types";

let conversionQueue: Conversion[] = [];

export function addToQueue(conversion: Conversion) {
  conversionQueue = [...conversionQueue, conversion];
}

export function removeFromQueue(conversion: Conversion) {
  conversionQueue = conversionQueue.filter((q) => q !== conversion);
}

export function totalInQueue() {
  return conversionQueue.length;
}

export function getQueue() {
  return [...conversionQueue];
}

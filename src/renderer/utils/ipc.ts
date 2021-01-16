import { ipcRenderer, IpcRendererEvent } from "electron";
import { useEffect } from "react";
import { ToMainChannels, ToRendererChannels } from "../../ipc";

export function invokeToMain<T extends keyof ToMainChannels>(
  channel: T,
  ...args: Parameters<ToMainChannels[T]>
): Promise<ReturnType<ToMainChannels[T]>> {
  return ipcRenderer.invoke(channel, ...args);
}

export type EventListener<T extends keyof ToRendererChannels> = (
  event: IpcRendererEvent,
  ...args: Parameters<ToRendererChannels[T]>
) => ReturnType<ToRendererChannels[T]>;

export function addListener<T extends keyof ToRendererChannels>(
  channel: T,
  listener: EventListener<T>
) {
  return ipcRenderer.on(channel, listener);
}

export function removeListener<T extends keyof ToRendererChannels>(
  channel: T,
  listener: EventListener<T>
) {
  return ipcRenderer.removeListener(channel, listener);
}

export function useListener<T extends keyof ToRendererChannels>(
  channel: T,
  listener: EventListener<T>
) {
  useEffect(() => {
    addListener(channel, listener);
    return () => removeListener(channel, listener);
  }, []);
}

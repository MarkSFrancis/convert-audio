import {
  IpcMainInvokeEvent,
  dialog,
  ipcMain,
  shell,
  BrowserWindow,
} from "electron";
import { ToMainChannels, ToRendererChannels } from "../ipc";
import { convert } from "./converter";
import { getQueue } from "./converter/queue";

type EventHandler<T extends keyof ToMainChannels> = (
  event: IpcMainInvokeEvent,
  ...args: Parameters<ToMainChannels[T]>
) => ReturnType<ToMainChannels[T]>;

type EventHandlers = {
  [K in keyof ToMainChannels]: EventHandler<K>;
};

const eventHandlers: EventHandlers = {
  showFileInBrowser(_event, item) {
    shell.showItemInFolder(item);
  },
  showOpenDialog: async (event, options) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    const result = await dialog.showOpenDialog(window, options);

    return result.filePaths;
  },
  pushToQueue: async (_event, filePaths, options) => {
    for (const originalPath of filePaths) {
      convert({ originalPath, options });
    }
  },
  getProgress: () => getQueue(),
};

export function setupMainIpcListeners() {
  for (const channel in eventHandlers) {
    ipcMain.handle(channel, (event, ...args) => {
      const handler = eventHandlers[channel as keyof ToMainChannels];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (handler as any)(event, ...args);
    });
  }
}

export function triggerInAllRenderers<T extends keyof ToRendererChannels>(
  channel: T,
  ...args: Parameters<ToRendererChannels[T]>
) {
  BrowserWindow.getAllWindows().map((w) =>
    w.webContents.send(channel, ...args)
  );
}

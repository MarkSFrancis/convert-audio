import { useState } from "react";
import { FileConversionStatus } from "../../../ipc";
import { useListener } from "../ipc";

export const appName = "Convert Audio";

export function useAppTitle() {
  const [appTitle, setAppTitle] = useState(appName);

  useListener("updateProgress", (_event, files) => {
    const converting = files.filter(
      (f) =>
        f.status === FileConversionStatus.Processing ||
        f.status === FileConversionStatus.Waiting
    );
    const failed = files.filter(
      (f) => f.status === FileConversionStatus.Failed
    );
    const complete = files.filter(
      (f) => f.status === FileConversionStatus.Complete
    );

    const breadcrumb: string[] = [];

    if (failed.length > 0) {
      breadcrumb.push(`${failed.length} failed`);
    }
    if (converting.length > 0 || complete.length > 0) {
      breadcrumb.push(`${complete.length}/${files.length} converted`);
    }

    setAppTitle([...breadcrumb, appName].join(" | "));
  });

  return appTitle;
}

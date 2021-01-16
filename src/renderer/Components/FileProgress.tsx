import { Button, ListGroupItem, ProgressBar } from "react-bootstrap";
import { FileConversion, FileConversionStatus } from "../../ipc";
import { invokeToMain } from "../utils/ipc";

export interface FileProgressProps {
  file: FileConversion;
}

export function FileProgress(props: FileProgressProps) {
  const f = props.file;

  function showFile() {
    invokeToMain("showFileInBrowser", f.newPath);
  }

  function getVariant(file: FileConversion) {
    switch (file.status) {
      case FileConversionStatus.Complete:
        return "success";
      case FileConversionStatus.Failed:
        return "danger";
      case FileConversionStatus.Processing:
        return "info";
      default:
        return undefined;
    }
  }

  return (
    <ListGroupItem
      key={f.id}
      variant={getVariant(f)}
      className="d-flex justify-content-between align-items-center"
    >
      <div>
        {f.originalPath} to{" "}
        {f.newPath.substring(f.newPath.lastIndexOf(".") + 1)}
        {f.status === FileConversionStatus.Waiting && (
          <div>Waiting to start...</div>
        )}
        {f.status === FileConversionStatus.Processing && (
          <div>
            <ProgressBar
              now={f.progressPercentage}
              animated
              label={`${f.progressPercentage.toLocaleString("en-GB", {
                maximumFractionDigits: 0,
              })}%`}
            />
          </div>
        )}
        {f.status === FileConversionStatus.Failed && (
          <div className="text-danger">{f.errorMessage}</div>
        )}
      </div>
      {f.status === FileConversionStatus.Complete && (
        <div>
          <Button onClick={() => showFile()}>Show in folder</Button>
        </div>
      )}
    </ListGroupItem>
  );
}

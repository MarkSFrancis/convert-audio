import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { FileConversion } from "../../ipc";
import { invokeToMain, useListener } from "../utils/ipc";
import { FileProgress } from "./FileProgress";

export interface FileDropProps {
  convertTo: string;
}

export function FileDrop(props: FileDropProps) {
  const [files, setFiles] = useState<FileConversion[]>([]);

  function addToQueue(files: File[]) {
    invokeToMain(
      "pushToQueue",
      files.map((f) => f.path),
      props.convertTo
    );
  }

  useEffect(() => {
    (async () => {
      const files = await invokeToMain("getProgress");
      setFiles(files || []);
    })();
  }, []);

  useListener("updateProgress", (_event, files) => {
    setFiles(files || []);
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (files) => addToQueue(files),
  });

  return (
    <section>
      <div
        style={{ cursor: "pointer" }}
        {...getRootProps({ className: "dropzone" })}
      >
        <input {...getInputProps()} />
        <p>Drop some files here to get started, or click to select files</p>
      </div>
      <aside>
        <ListGroup>
          {files.map((f) => (
            <FileProgress file={f} key={f.id} />
          ))}
        </ListGroup>
      </aside>
    </section>
  );
}

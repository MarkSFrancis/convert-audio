import { FC } from "react";
import { ListGroup } from "react-bootstrap";
import { useDropzone } from "react-dropzone";

export const FileDrop: FC = (props) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((f) => (
    <ListGroup.Item key={f.path}>
      {f.path} - {f.size} bytes
    </ListGroup.Item>
  ));

  return (
    <section>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drop some files here to get started, or click to select files</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ListGroup>{files}</ListGroup>
      </aside>
    </section>
  );
};

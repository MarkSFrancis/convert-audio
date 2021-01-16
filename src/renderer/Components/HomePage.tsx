import React, { FC, useState } from "react";
import { FileDrop } from "./FileDrop";
import { Container } from "react-bootstrap";
import Helmet from "react-helmet";
import { useAppTitle } from "../utils/appName";
import { ConvertTo } from "./ConvertTo";

export const HomePage: FC = () => {
  const appTitle = useAppTitle();
  const [convertTo, setConvertTo] = useState("");

  return (
    <>
      <Helmet>
        <title>{appTitle}</title>
      </Helmet>
      <Container>
        <ConvertTo format={convertTo} onFormatChange={setConvertTo} />
        <FileDrop convertTo={convertTo} />
      </Container>
    </>
  );
};

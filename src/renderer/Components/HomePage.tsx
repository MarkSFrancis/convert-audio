import React, { FC, useState } from "react";
import { FileDrop } from "./FileDrop";
import { Container } from "react-bootstrap";
import Helmet from "react-helmet";
import { useAppTitle } from "../utils/hooks/appName";
import { ConversionOptions } from "../utils/conversionOptions";
import { ConvertOptions } from "./ConvertOptions";

export const HomePage: FC = () => {
  const appTitle = useAppTitle();
  const [options, setOptions] = useState<ConversionOptions>();

  return (
    <>
      <Helmet>
        <title>{appTitle}</title>
      </Helmet>
      <Container>
        <ConvertOptions onOptionsChange={setOptions} />
        <FileDrop convertTo={options} />
      </Container>
    </>
  );
};

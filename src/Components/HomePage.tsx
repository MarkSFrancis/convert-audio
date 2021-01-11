import React, { FC } from "react";
import { FileDrop } from "./FileDrop";
import { Container } from "react-bootstrap";

export const HomePage: FC = () => {
  return (
    <>
      <Container>
        <FileDrop />
      </Container>
    </>
  );
};

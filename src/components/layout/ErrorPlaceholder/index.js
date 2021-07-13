import React, { Fragment, useEffect } from "react";

import { Col, Spacing, Text } from "@/components";
import { COPY } from "@/copy";
import { Tokens } from "@/theme";
import { notify } from "@/utils";

export const ErrorPlaceholder = ({ 
  error, 
  notifyError, 
  onShowError 
}) => {

  useEffect(() => {
    if (error && notifyError ==="notify") {
      notify.warning({
        title: error
      });
      onShowError();
    }
  }, [error]);

  if (notifyError ==="notify") {
    return <Fragment />;
  }

  return (
    <Col m="auto">
      <Col maxW={250}>
        <Spacing top={Tokens.unit(1)} />
        <Text center subtitle bold>
          {COPY.error}
        </Text>
        <Spacing top={Tokens.unit(2)} />
        <Text center>
          {error}
        </Text>
      </Col>
    </Col>
  );
};

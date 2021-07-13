import React, { Fragment } from "react";
import { ScrollView } from "react-native";

import { ErrorPlaceholder } from "../ErrorPlaceholder";
import { Layout } from "../Layout";
import { Loader } from "../Loader";

export const Screen = ({
  error,
  onShowError,
  notifyError,
  children,
  loading,
  loadingPlaceholder,
  containerProps = { contentContainerStyle: { flex: 1 } },
  noHeader = false,
  showFooter = false,
  ...rest
}) => {
  const renderContent = () => {
    if (loading) {
      return <Loader />;
    }

    const shouldShowAllChildren = noHeader || !Array.isArray(children);
    const content = shouldShowAllChildren ? children : children.slice(1);

    return (
      <Fragment>
        {!loading && !!error && (
          <ErrorPlaceholder
            error={error}
            onShowError={onShowError}
            notifyError={notifyError}
          />
        )}
        {content}
      </Fragment>
    );
  };

  return (
    <ScrollView {...containerProps}>
      {!noHeader && children?.[0]}
      <Layout {...rest} showFooter = {showFooter}>{renderContent()}</Layout>
    </ScrollView>
  );
};

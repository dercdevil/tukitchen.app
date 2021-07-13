import React, { Suspense } from "react";

import { Screen, Header, Spinner } from "@/components";
import { COPY } from "@/copy";

const lazyRoute = (Route, extraProps = {}) => (props = {}) => (
    <Suspense
        fallback={
            <Screen>
                <Header showBack={false} title={COPY["menu.loading"]} />
                <Spinner />
            </Screen>
        }
    >
        <Route {...props} {...extraProps} />
    </Suspense>
);

export default lazyRoute;

import React from "react";
import RMapView from "react-native-maps";
import { withStyleProps } from "@/hocs";

const MapView = withStyleProps(RMapView);

const initialProps = {
    minZoomLevel: 13,
    maxZoomLevel: 16,
    toolbarEnabled: false
}

export const CustomMap = ({
    ...props
}) => {
    return(
        <MapView {...initialProps}  {...props} />
    );
}


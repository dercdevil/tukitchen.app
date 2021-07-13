import React , { forwardRef} from "react";
import{
    Box
} from "@/components";
import { Portal } from "react-native-paper";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";

import { SheetHeader } from "./index";

export const BottomSheetModal = forwardRef( ({
    children
},ref) => {
    
    const fall = new Animated.Value(1);

    return(
        <Portal>
            <BottomSheet
                ref = {ref}
                snapPoints={[400,0]}
                callbackNode={fall}
                enabledGestureInteraction
                enabledContentGestureInteraction={false}
                enabledBottomInitialAnimation
                enabledInnerScrolling
                borderRadius={0}
                initialSnap={1}
                renderHeader = {SheetHeader}
                renderContent={() => (
                    <Box h = {400} bg = "blue">
                        {children}
                    </Box>
                )}
            />
        </Portal>
    )
})
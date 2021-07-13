import { useContext, useEffect } from "react";
import { ManageThemeContext } from "@/contexts";

export const useTheme = (props) => {
    const { barProps } = props || {};
    const theme = useContext(ManageThemeContext);
    useEffect( () => {
        theme.updateBar( oldProps => ({ ...oldProps, ...barProps}));
    }, [] );
    return theme;
}

import { useContext } from "react";
import { SidebarContext } from "@/contexts";

export const useSidebar = () => useContext(SidebarContext);

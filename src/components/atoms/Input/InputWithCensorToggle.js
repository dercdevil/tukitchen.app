import { withCensorToggle } from "@/hocs";
import { Input } from "./Input";

export const InputWithCensorToggle = withCensorToggle(Input);

InputWithCensorToggle.displayName = "InputWithCensorToggle";

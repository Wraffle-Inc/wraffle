import {
  findComponentFromChildren,
  findRestFromChildren,
} from "@/shared/utils";
import { ErrorMessage } from "../errorMessage/ErrorMessage";
import { Input } from "../input/Input";
import { Label } from "../label/Label";

export interface InputFieldProps {
  children: React.ReactNode;
}

const InputField = ({ children }: InputFieldProps) => {
  const labelComponent = findComponentFromChildren(children, Label);
  const errorMessageComponent = findComponentFromChildren(
    children,
    ErrorMessage
  );
  const restComponents = findRestFromChildren(children, [Label, ErrorMessage]);
  return (
    <div>
      <div className="mb-2">{labelComponent}</div>
      {restComponents}
      <div className="min-h-6">{errorMessageComponent}</div>
    </div>
  );
};

InputField.Label = Label;
InputField.Input = Input;
InputField.ErrorMessage = ErrorMessage;

export { InputField };

import { HTMLInputTypeAttribute, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

type TextFieldWithLabelProps = {
  label: string;
  showLabel?: boolean;
  placeholderText: string;
  errorText: string;
  type?: HTMLInputTypeAttribute;
  pattern?: string;
  onValidText: (text: string) => void;
  onTextChange?: (text: string) => void;
  showError?: boolean;
  name?: string;
  className?: string;
};

const TextFieldWithLabel = forwardRef<
  HTMLInputElement,
  TextFieldWithLabelProps
>(
  (
    {
      label,
      placeholderText,
      type,
      errorText,
      pattern,
      onValidText,
      onTextChange,
      showError,
      name,
      showLabel = true,
      className,
    },
    ref
  ) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const inputType = showPassword ? "text" : type;

    // Create a local ref to handle the ref properly
    const internalRef = useRef<HTMLInputElement | null>(null);
    useImperativeHandle(ref, () => internalRef.current!);

    const handleInput = () => {
      const currentRef = internalRef.current;
      if (currentRef) {
        if (onTextChange) {
          onTextChange(currentRef.value.trim());
        }
        if (!currentRef.checkValidity()) {
          setErrorMessage(errorText);
          onValidText("");
        } else {
          setErrorMessage("");
          onValidText(currentRef.value.trim());
        }
      }
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
      if (type === "password") event.preventDefault();
    };

    const handleCopy = (event: React.ClipboardEvent<HTMLInputElement>) => {
      if (type === "password") event.preventDefault();
    };

    useEffect(() => {
      if (showError && errorMessage === "") {
        setErrorMessage(errorText);
      }
    }, [showError, errorText, errorMessage]);

    return (
      <div className={`py-2 w-full ${className}`}>
        <div className="mb-4">
          {showLabel ? (
            <label
              htmlFor={name}
              className={
                errorMessage
                  ? "block mb-2 text-md font-semibold text-red-700 dark:text-red-500"
                  : "mb-2 font-semibold text-md"
              }
            >
              {label} :
            </label>
          ) : null}

          <div className="relative">
            <input
              name={name}
              required={true}
              ref={internalRef}
              type={inputType}
              pattern={pattern}
              onPaste={handlePaste}
              onCopy={handleCopy}
              className={
                errorMessage
                  ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                  : "w-full border-red-500 p-2 text-sm focus:outline-none focus:border-green-700 rounded-lg border-2 required:border-green-500 text-green-700"
              }
              placeholder={placeholderText}
              onInput={handleInput}
            />
            {type === "password" && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            )}
          </div>
          {errorMessage && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    );
  }
);


export default TextFieldWithLabel;

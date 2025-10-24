import React from "react";
import Select from "react-select";
import { Field, ErrorMessage } from "formik";

interface MultiSelectProps {
  name: string;
  label: string;
  options: { label: string; value: any }[];
  isLoading?: boolean;
  placeholder?: string;
  menuPlacement?: "top" | "bottom";
}

const MultiSelectField: React.FC<MultiSelectProps> = ({
  name,
  label,
  options,
  isLoading = false,
  placeholder = "Select...",
  menuPlacement = "bottom",
}) => {
  return (
    <div className="profile__field mt-2">
      <div className="profile__field__label">{label}</div>
      <div className="profile__field__value">
        <Field name={name}>
          {({ field, form: { touched, setFieldValue, setTouched } }: any) => (
            <Select
              instanceId={`${name}-select`}
              options={options || []}
              isLoading={isLoading}
              isMulti
              placeholder={placeholder}
              defaultValue={field.value}
              onChange={(value) => setFieldValue(field.name, value)}
              onBlur={() =>
                setTouched({
                  ...touched,
                  [field.name]: true,
                })
              }
              menuPlacement={menuPlacement}
              classNamePrefix="react-select"
            />
          )}
        </Field>
        <ErrorMessage name={name} component="div" className="error" />
      </div>
    </div>
  );
};

export default MultiSelectField;

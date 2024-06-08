import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { FieldProps } from "formik";

interface FormikFieldProps extends FieldProps, Omit<TextFieldProps, 'name' | 'value' | 'error'> {
  label: string;
  type: string;
}

const FormikField: React.FC<FormikFieldProps> = ({
  field,
  form: { touched, errors },
  ...props
}) => {
  const errorText = touched[field.name] && errors[field.name] ? errors[field.name] : "";
  return (
    <TextField
      {...field}
      {...props}
      helperText={errorText as string}
      error={Boolean(errorText)}
      variant="outlined"
      fullWidth
    />
  );
};

export default FormikField;

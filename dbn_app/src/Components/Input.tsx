import { forwardRef, type ComponentPropsWithoutRef } from 'react';

type InputProps = {
  label: string;
  id: string;
  readOnly?: boolean; // Add readOnly prop
} & ComponentPropsWithoutRef<'input'>;

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, id, readOnly, ...props },
  ref
) {
  return (
    <p>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} ref={ref} readOnly={readOnly} {...props} />
    </p>
  );
});

export default Input;

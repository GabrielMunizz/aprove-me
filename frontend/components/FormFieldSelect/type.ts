import { UseFormReturn } from 'react-hook-form';

export type FormFieldProps = {
  form: UseFormReturn<
    {
      value: string;
      emissionDate: Date;
      assignor: string;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    undefined
  >;
  name: 'value' | 'emissionDate' | 'assignor';
  label: string;
  placeHolder: string;
  type?: string;
};

import React from 'react';
import { FormFieldProps } from './type';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FormFieldSelectType<T extends string> extends FormFieldProps {
  options: { value: T; label: string }[];
}

const FormFieldSelect = <T extends string>({
  form,
  placeHolder,
  name,
  label,
  options,
}: FormFieldSelectType<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={
              field.value instanceof Date
                ? field.value.toISOString().split('T')[0]
                : field.value.toString()
            }
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeHolder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFieldSelect;

import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import FormInput from '../FormInput/FormInput';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { DatePicker } from '../DatePicker/DatePicker';
import Link from 'next/link';
import { Payable } from '@/utils/types';

const formSchema = z.object({
  id: z.string(),
  value: z
    .string({
      message: 'O valor é obrigatório.',
    })
    .refine(
      (val) => {
        const numericValue = parseFloat(val);
        return !isNaN(numericValue) && numericValue >= 0;
      },
      { message: 'O valor não pode ser negativo' }
    ),
  emissionDate: z.date({
    required_error: 'A data é obrigatória.',
  }),
});

export type FormData = z.infer<typeof formSchema>;

type ListPayablesProps = {
  payable: Payable;
};

const ListPayables = ({ payable }: ListPayablesProps) => {
  const { id, value = 0, emissionDate } = payable;
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id,
      value: value.toFixed(2).toString(),
      emissionDate,
    },
  });
  return (
    <Card className="w-[600px] px-2 mb-4">
      <CardHeader className="flex flex-row justify-between items-center w-full">
        <p className="font-semibold text-sm">{`ID: ${id}`}</p>
        <Link href="" className="text-sm">
          Ver informações do cedente
        </Link>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <div className="flex w-full justify-start items-center gap-4">
            <div className="flex flex-col h-[100px]">
              <FormInput
                form={form}
                name="value"
                label="Valor do recebível"
                labelClassname="text-sm font-semibold"
                placeholder="Digite seu login"
              />
            </div>
            <div className="flex flex-col h-[100px]">
              <FormField
                control={form.control}
                name="emissionDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-sm font-semibold">
                      Data de emissão:
                    </FormLabel>
                    <DatePicker
                      value={field.value}
                      disabled
                      onChange={field.onChange}
                    />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <CardFooter className="flex justify-end items-center mt-4 w-full gap-4 p-0">
            <Button
              type="submit"
              className="w-[100px] bg-red-600 hover:bg-red-700 font-bold"
            >
              Excluir
            </Button>
            <Button
              type="submit"
              className="bg-[#005ee0] hover:bg-[#1457b4] font-bold w-[100px]"
            >
              Editar
            </Button>
          </CardFooter>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ListPayables;

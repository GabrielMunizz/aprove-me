'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { DatePicker } from '../DatePicker/DatePicker';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import FormFieldSelect from '../FormFieldSelect/FormFieldSelect';
import FormInput from '../FormInput/FormInput';
import { handleFetchAssignors } from '@/utils/fetch';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  value: z.string().trim().min(1, {
    message: 'O valor é obrigatório.',
  }),
  emissionDate: z.date({
    required_error: 'A data é obrigatória.',
  }),
  assignor: z.string().trim().min(1, {
    message: 'É necessário selecionar um cedente.',
  }),
});

type FormSchema = z.infer<typeof formSchema>;

const RegisterPayable = () => {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => handleFetchAssignors(),
  });

  console.log('DATA -->', data);
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: '',
      emissionDate: new Date(),
      assignor: '',
    },
  });

  const handleSubmit = (formData: FormData) => {
    console.log(formData);
  };

  const handleCancel = () => {
    form.reset();
    router.push('/login');
  };
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-[#005ee0]">Cadastro de recebíveis</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="grid w-full items-center gap-8">
              <div className="flex flex-col space-y-1.5">
                <FormInput
                  form={form}
                  name="value"
                  label="Valor"
                  labelClassname="text-normal font-semibold text-sm"
                  placeholder="Digite o valor do recebível"
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="emissionDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Data</FormLabel>
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <FormFieldSelect
                  name="emissionDate"
                  placeHolder="Escolha o tipo"
                  form={form}
                  label="Cedente"
                  options={[]}
                />
              </div>
            </div>
            <CardFooter className="flex justify-between mt-8">
              <Button variant="outline" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-[#005ee0] hover:bg-[#1457b4] font-bold"
              >
                Cadastrar
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RegisterPayable;

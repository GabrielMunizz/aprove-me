'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  handleCreatePayable,
  handleFetchAssignors,
  setAccessToken,
} from '@/utils/fetch';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import formatAssignors, { Assignors } from '@/utils/formatAssignors';
import { toast } from 'sonner';

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
import FormInput from '../FormInput/FormInput';
import Combobox from '../ComboBox/Combobox';
import { Toaster } from '@/components/ui/sonner';
import { AxiosError } from 'axios';

const formSchema = z.object({
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
  assignor: z.string().trim().min(1, {
    message: 'É necessário selecionar um cedente.',
  }),
});

export type FormData = z.infer<typeof formSchema>;

const RegisterPayable = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      setAccessToken(JSON.parse(token));
    }
  }
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const { data } = await handleFetchAssignors();
      if (data) {
        return data as Assignors[];
      }

      return [] as Assignors[];
    },
  });

  const assignors = data ? data : [];

  const assignorOptions = formatAssignors(assignors);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: '0',
      emissionDate: new Date(),
      assignor: '',
    },
  });

  const handleSubmit = async (formData: FormData) => {
    try {
      const { status } = await handleCreatePayable(formData);
      toast.success('Recebível cadastrado com sucesso!');
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error?.status === 400) {
          toast.error('Teste');
        }
      }
      console.error(error);
    }
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
                  type="number"
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
                <Combobox
                  form={form}
                  name="assignor"
                  label="Cedente"
                  placeHolder="Selecionar cedente"
                  options={assignorOptions}
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
      <Toaster />
    </Card>
  );
};

export default RegisterPayable;

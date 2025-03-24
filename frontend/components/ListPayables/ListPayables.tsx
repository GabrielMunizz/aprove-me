import React, { useState } from 'react';

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
import { handleDeletePayable, handleUpdatePayable } from '@/utils/fetch';
import { Toaster } from '@/components/ui/sonner';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

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
  const { id, value = 0, emissionDate, assignorId } = payable;

  const queryClient = useQueryClient();

  const [isEdit, setIsEdit] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id,
      value: value.toFixed(2).toString(),
      emissionDate: new Date(emissionDate),
    },
  });

  const handleEdit = () => {
    setIsEdit(true);
    return;
  };

  const handleSubmit = async (formData: FormData) => {
    const { value } = formData;
    try {
      await handleUpdatePayable({
        ...formData,
        value: Number(value),
        assignorId,
      });

      setIsEdit(false);

      toast.success('Recebível editado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['payables'] });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error?.status === 401) {
          toast.error('Token expirado!');
        } else {
          toast.error('Ops! Um erro inesperado ocorreu.');
        }
      }
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await handleDeletePayable(id);
      toast.success('Recebível deletado com sucesso');
      queryClient.invalidateQueries({ queryKey: ['payables'] });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error?.status === 401) {
          toast.error('Token expirado!');
        } else {
          toast.error('Ops! Um erro inesperado ocorreu.');
        }
      }
    }
  };
  return (
    <Card className="w-[600px] px-2 mb-4">
      <CardHeader className="flex flex-row justify-between items-center w-full">
        <p className="font-semibold text-sm text-muted-foreground">{`ID: ${id}`}</p>
        <Link
          href=""
          className="text-sm hover:text-[#005ee0] underline decoration-dotted"
        >
          Ver detalhes
        </Link>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form>
            <div className="flex w-full justify-start items-center gap-4">
              <div className="flex flex-col h-[100px]">
                <FormInput
                  form={form}
                  name="value"
                  disabled={!isEdit}
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
                        disabled={!isEdit}
                        onChange={field.onChange}
                      />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <CardFooter className="flex justify-between items-center mt-4 w-full gap-4 p-0">
              <Button
                type="button"
                onClick={handleDelete}
                className="w-[100px] bg-transparent hover:bg-transparent hover:text-black text-muted-foreground border-0 shadow-[none] font-bold underline"
              >
                Excluir
              </Button>
              <Button
                type={isEdit ? 'submit' : 'button'}
                onClick={(e) => {
                  e.preventDefault();
                  if (!isEdit) {
                    handleEdit();
                  } else {
                    form.handleSubmit(handleSubmit)();
                  }
                }}
                className={`${
                  !isEdit
                    ? 'bg-[#005ee0] hover:bg-[#1457b4]'
                    : 'bg-green-600 hover:bg-green-700'
                } font-bold w-[100px]`}
              >
                {!isEdit ? 'Editar' : 'Salvar'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
      <Toaster />
    </Card>
  );
};

export default ListPayables;

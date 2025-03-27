'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import FormInput from '@/components/FormInput/FormInput';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { DatePicker } from '@/components/DatePicker/DatePicker';
import Link from 'next/link';
import {
  handleDeletePayable,
  handleFetchAssignorById,
  handleFetchPayableByID,
  handleUpdatePayable,
} from '@/utils/fetch';
import { Toaster } from '@/components/ui/sonner';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header/Header';

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
  assignor: z.string(),
});

export type FormData = z.infer<typeof formSchema>;

type PayableDetailsProps = {
  params: { id: string };
};

const PayableDetails = ({ params }: PayableDetailsProps) => {
  const { id } = params;
  const [isEdit, setIsEdit] = useState(false);

  const { data: payable } = useQuery({
    queryKey: ['payable'],
    queryFn: () => handleFetchPayableByID(id),
  });

  const { data: assignor } = useQuery({
    queryKey: ['assignor'],
    queryFn: () => handleFetchAssignorById(payable?.assignorId),
  });

  const queryClient = useQueryClient();

  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id,
      value: payable.value.toFixed(2).toString(),
      emissionDate: new Date(payable.emissionDate),
      assignor,
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
        assignorId: payable.assignorId,
      });

      setIsEdit(false);

      toast.success('Recebível editado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['payables'] });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error?.status === 401) {
          toast.error('Token expirado!');
          router.push('/login');
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
      queryClient.invalidateQueries({ queryKey: ['payable'] });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error?.status === 401) {
          toast.error('Token expirado!');
          router.push('/login');
        } else {
          toast.error('Ops! Um erro inesperado ocorreu.');
        }
      }
    }
  };

  return (
    <main>
      <Header />

      <section className="w-full flex flex-col justify-center items-center h-[50vh]">
        <h1 className="text-lg font-bold mb-8">Detalhes do recebível:</h1>
        <Card className="w-[600px] px-2 mb-4">
          <CardHeader className="flex flex-row justify-between items-center w-full">
            <p className="font-semibold text-sm text-muted-foreground mt-[6px]">{`ID: ${id}`}</p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form>
                <div className="flex flex-col w-full justify-start items-center">
                  <div className="flex w-full justify-start items-center gap-4">
                    <div className="flex flex-col h-[100px]">
                      <FormInput
                        form={form}
                        name="value"
                        disabled={!isEdit}
                        label="Valor do recebível"
                        labelClassname="text-sm font-semibold"
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

                  <div className="flex flex-col h-[50px] justify-start w-full ">
                    <p className="font-semibold text-sm">Cedente: </p>
                    <Link
                      className="underline decoration-dotted hover:text-[#005ee0]"
                      href={`/assignor/${assignor.id}`}
                    >
                      {assignor.name}
                    </Link>
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
      </section>
    </main>
  );
};

export default PayableDetails;

'use client';

import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import BANKME_LOGO from '../../public/bankme_logo.png';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { TailSpin } from 'react-loader-spinner';
import FormInput from '@/components/FormInput/FormInput';

const formSchema = z.object({
  login: z.string().min(3, { message: 'Mínimo 3 caracteres' }),
  password: z
    .string()
    .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' }),
});

type FormData = z.infer<typeof formSchema>;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const handleLogin = async (login: string, password: string) => {
    const response = await axios.post(
      'http://localhost:3001/integrations/auth',
      { login, password }
    );

    return response;
  };

  const handleSubmit = async (formdata: FormData) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const { data } = await handleLogin(formdata.login, formdata.password);

      localStorage.setItem('token', JSON.stringify(data.accessToken));
      router.push('/');
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error?.status === 401) {
          setErrorMessage('Login ou senha inválidos');
        } else {
          setErrorMessage('Usuário não encontrado');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full flex justify-center items-center h-[80vh]">
      <Card className="w-[350px]">
        <CardHeader>
          <div className="w-full flex justify-center mb-4">
            <Image src={BANKME_LOGO} alt="bankme logo" width={150} />
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col h-[100px]">
                  <FormInput
                    form={form}
                    name="login"
                    label="Login"
                    labelClassname="text-base"
                    placeholder="Digite seu login"
                  />
                </div>
                <div className="flex flex-col h-[100px]">
                  <FormInput
                    form={form}
                    name="password"
                    label="Senha"
                    labelClassname="text-base"
                    placeholder="Digite a senha"
                    type="password"
                  />
                </div>
              </div>
              <CardFooter className="flex flex-col justify-center mt-4">
                <Button
                  type="submit"
                  className="w-[120px] bg-[#005ee0] hover:bg-[#1457b4] font-bold"
                >
                  {isLoading ? <TailSpin width={30} color="white" /> : 'Login'}
                </Button>

                <p className="text-red-600 mt-2">
                  {errorMessage ? errorMessage : null}
                </p>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
};

export default Login;

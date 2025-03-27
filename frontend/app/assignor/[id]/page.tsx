'use client';

import React from 'react';
import Header from '@/components/Header/Header';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useQuery } from '@tanstack/react-query';
import { handleFetchAssignorById } from '@/utils/fetch';
import { Label } from '@radix-ui/react-label';

type AssignorDetailsProps = {
  params: { id: string };
};

const AssignorDetails = ({ params }: AssignorDetailsProps) => {
  const { id } = params;

  const { data: assignor } = useQuery({
    queryKey: ['assignor'],
    queryFn: () => handleFetchAssignorById(id),
  });

  console.log(assignor);

  return (
    <main>
      <Header />
      <h1 className="text-lg font-bold w-full text-center mt-8">
        Informações do cedente:
      </h1>
      <section className="w-full flex justify-center items-center mt-8">
        <Card className="w-[600px] px-2 mb-4 flex flex-col justify-center items-center">
          <CardHeader className="flex flex-row justify-between items-center w-full">
            <p className="font-semibold text-sm text-muted-foreground">{`ID: ${id}`}</p>
          </CardHeader>
          <CardContent>
            <Label className="text-sm font-semibold">
              Cedente:
              <Input
                value={assignor.name}
                className="w-[350px] text-base font-normal"
              />
            </Label>
            <Label className="text-sm font-semibold">
              E-mail:
              <Input
                value={assignor.email}
                className="w-[350px] text-base font-normal"
              />
            </Label>
            <Label className="text-sm font-semibold">
              {assignor.document.length === 11 ? 'CPF' : 'CNPJ'}
              <Input
                value={assignor.document}
                className="w-[350px] text-base font-normal"
              />
            </Label>
            <Label className="text-sm font-semibold">
              Telefone:
              <Input
                value={assignor.phone}
                className="w-[350px] text-base font-normal"
              />
            </Label>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default AssignorDetails;

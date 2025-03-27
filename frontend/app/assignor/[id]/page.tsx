import React from 'react';
import Header from '@/components/Header/Header';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

type AssignorDetailsProps = {
  params: { id: string };
};

const AssignorDetails = ({ params }: AssignorDetailsProps) => {
  const { id } = params;

  return (
    <main>
      <Header />
      <section>
        <Card className="w-[600px] px-2 mb-4">
          <CardHeader className="flex flex-row justify-between items-center w-full">
            <p className="font-semibold text-sm text-muted-foreground">{`ID: ${id}`}</p>
          </CardHeader>
          <CardContent>
            <Input value="" />
            <Input value="" />
            <Input value="" />
            <Input value="" />
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default AssignorDetails;

'use client';

import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { handleFetchPayables } from '@/utils/fetch';

const ListPayables = () => {
  const { data } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => handleFetchPayables(),
  });

  console.log(data);
  return (
    <Card className="w-[350px]">
      <CardHeader></CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col h-[100px]"></div>
          <div className="flex flex-col h-[100px]"></div>
        </div>
        <CardFooter className="flex flex-col justify-center mt-4">
          <Button
            type="submit"
            className="w-[120px] bg-[#005ee0] hover:bg-[#1457b4] font-bold"
          >
            'Login'
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default ListPayables;

import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DatePicker } from '../DatePicker/DatePicker';

const RegisterPayable = () => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-[#005ee0]">Cadastro de recebíveis</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-8">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="payable">Valor</Label>
              <Input id="payable" placeholder="Valor do recebível" />
            </div>
            <div>
              <Label htmlFor="emissionDate">Data de emissão</Label>
              <DatePicker />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="assignor">Cedente</Label>
              <Select>
                <SelectTrigger id="assignor">
                  <SelectValue placeholder="Selecionar" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between mt-8">
        <Button variant="outline">Cancelar</Button>
        <Button className="bg-[#005ee0] hover:bg-[#1457b4] font-bold">
          Cadastrar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RegisterPayable;

import { Check, Plus, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Select, SelectContent, SelectTrigger, SelectValue } from "../ui/select";

import { Button } from "../ui/button";
import { DatePicker } from "../ui/date-picker";
import { Input } from "../ui/input";
import { SelectItem } from "@radix-ui/react-select";
import { Textarea } from "../ui/textarea";
import { UserApi } from "@/apis/user.api";
import { monthlyFeeCreateForm } from "@/core/schemas/monthlyFee.schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export function RegisterMonthlyFee() {
  const userApi = new UserApi()

  const form = useForm<z.infer<typeof monthlyFeeCreateForm>>({
    resolver: zodResolver(monthlyFeeCreateForm),
    defaultValues: {
      amount: 0,
      dueDate: new Date(),
      userId: ''
    }
  });

  const submit = () => {
    const value = form.getValues();

    console.log({ value });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Cadastrar mensalidade
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastro de mensalidades</DialogTitle>
          <DialogDescription>Cadastro das mensalidades dos usuários</DialogDescription>
        </DialogHeader>

        {/* content */}
        <Form {...form}>
          <div className="flex flex-col gap-3">
            {/* Usuário */}
            <div className="flex flex-col gap-3">
              <label htmlFor="">Usuário</label>
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor da mensalidade</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="e"></SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* monthly value */}
            <div className="flex flex-col gap-3">
              <label htmlFor="">Valor da mensalidade</label>
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor da mensalidade</FormLabel>
                    <FormControl>
                      <Input placeholder="R$50,00" {...field} />
                    </FormControl>
                    <FormDescription>

                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* monthly due */}
            <div className="flex flex-col gap-3">
              <label htmlFor="">Data de vencimento</label>
              <DatePicker onSelect={() => { }} selected={new Date()} />
            </div>

            {/* date start && finish */}
            <div className="flex items-center gap-3">
              {/* start date */}
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="">Data de vencimento</label>
                <DatePicker onSelect={() => { }} selected={new Date()} />
              </div>

              {/* finish date */}
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="">Data de vencimento</label>
                <DatePicker onSelect={() => { }} selected={new Date()} />
              </div>
            </div>

            {/* Annotation */}
            <div className="flex flex-col gap-3">
              <label htmlFor="">Anotações</label>
              <Textarea className="resize-none" placeholder="Anotações importantes" />
            </div>
          </div>
        </Form>

        <DialogFooter className="flex justify-end items-center gap-3">
          <Button variant='ghost'>Cancelar <X /></Button>
          <Button onClick={async () => submit()}>Salvar <Check /></Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
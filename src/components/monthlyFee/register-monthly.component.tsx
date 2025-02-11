import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Select, SelectContent, SelectTrigger, SelectValue } from "../ui/select";

import { MonthlyFeeApi } from "@/apis/monthlyFee.api";
import { UserApi } from "@/apis/user.api";
import { Calendar } from "@/components/ui/calendar";
import { User } from "@/core/interfaces/user.interface";
import { monthlyFeeCreateForm } from "@/core/schemas/monthlyFee.schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectItem } from "@radix-ui/react-select";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export function RegisterMonthlyFee() {
  const userApi = new UserApi();
  const monthlyFeeApi = new MonthlyFeeApi();

  const [loadUser, setLoadUser] = useState<boolean>(false);

  const [users, setUsers] = useState<User[]>([]);

  const form = useForm<z.infer<typeof monthlyFeeCreateForm>>({
    resolver: zodResolver(monthlyFeeCreateForm),
    defaultValues: {
      amount: 0,
      dueDate: new Date(),
      userId: '',
      notes: ''
    }
  });

  const retrieveUsers = async (): Promise<void> => {
    if (loadUser) return;

    setLoadUser(true);
    userApi.find({ page: 1, size: 50 }).then(({ items }) => { setUsers(items) }).finally(() => { setLoadUser(false) });
  };

  useEffect(() => { if (!loadUser) { retrieveUsers() } }, [])

  const submit = async () => {
    const value = form.getValues();

    monthlyFeeApi.create(value).then(() => { console.log('success') });
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
            <div className="flex flex-col w-[90%] gap-3">
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usuário</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Selecione um usuário' >
                            {users.find(user => user._id === field.value)?.name || "Selecione um usuário"}
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {users.map(user => (
                          <SelectItem className="cursor-pointer hover:bg-slate-200" key={user._id} value={user._id}>{user.name} - ({user.alias})</SelectItem>
                        ))}
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
            <div className="flex flex-col w-[90%] gap-3">
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
            <div className="flex flex-col w-90% gap-3">
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data de vencimento</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? (format(field.value, "PPP")) : (<span>Pick a date</span>)}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* date start && finish */}


            {/* Annotation */}
            <div className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Anotações</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Anotações importantes" className="w-[90%] resize-none" {...field} />
                    </FormControl>
                    <FormDescription>

                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
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

// @todo - add in the line 146 in the future
// <div className="flex items-center w-[90%] gap-3">
// {/* start date */}
// <div className="flex flex-col gap-3 w-full">
//   <FormField
//     control={form.control}
//     name="dueDate"
//     render={({ field }) => (
//       <FormItem className="flex flex-col">
//         <FormLabel>Data de inicio</FormLabel>
//         <Popover>
//           <PopoverTrigger asChild>
//             <FormControl>
//               <Button
//                 variant={"outline"}
//                 className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
//               >
//                 {field.value ? (format(field.value, "PPP")) : (<span>Pick a date</span>)}
//                 <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//               </Button>
//             </FormControl>
//           </PopoverTrigger>
//           <PopoverContent className="w-auto p-0" align="start">
//             <Calendar
//               mode="single"
//               selected={field.value}
//               onSelect={field.onChange}
//               disabled={(date) =>
//                 date > new Date() || date < new Date("1900-01-01")
//               }
//               initialFocus
//             />
//           </PopoverContent>
//         </Popover>
//         <FormMessage />
//       </FormItem>
//     )}
//   />
// </div>

// {/* finish date */}
// <div className="flex flex-col gap-3 w-full">
//   <FormField
//     control={form.control}
//     name="dueDate"
//     render={({ field }) => (
//       <FormItem className="flex flex-col">
//         <FormLabel>Data de finalização</FormLabel>
//         <Popover>
//           <PopoverTrigger asChild>
//             <FormControl>
//               <Button
//                 variant={"outline"}
//                 className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
//               >
//                 {field.value ? (format(field.value, "PPP")) : (<span>Pick a date</span>)}
//                 <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//               </Button>
//             </FormControl>
//           </PopoverTrigger>
//           <PopoverContent className="w-auto p-0" align="start">
//             <Calendar
//               mode="single"
//               selected={field.value}
//               onSelect={field.onChange}
//               disabled={(date) =>
//                 date > new Date() || date < new Date("1900-01-01")
//               }
//               initialFocus
//             />
//           </PopoverContent>
//         </Popover>
//         <FormMessage />
//       </FormItem>
//     )}
//   />
// </div>
// </div>
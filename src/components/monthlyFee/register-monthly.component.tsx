import { Check, Plus, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Select, SelectContent, SelectGroup, SelectTrigger, SelectValue } from "../ui/select";

import { Button } from "../ui/button";
import { DatePicker } from "../ui/date-picker";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export function RegisterMonthlyFee() {
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
        <div className="flex flex-col gap-3">
          {/* Usuário */}
          <div className="flex flex-col gap-3">
            <label htmlFor="">Usuário</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder='Selecionar usuário' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {/* implements options here */}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* monthly value */}
          <div className="flex flex-col gap-3">
            <label htmlFor="">Valor da mensalidade</label>
            <Input placeholder="R$50,00" />
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

        <DialogFooter className="flex justify-end items-center gap-3">
          <Button variant='ghost'>Cancelar <X /></Button>
          <Button>Salvar <Check /></Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
import { Check, MoreVertical, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

import { Button } from "../ui/button";
import { DatePicker } from "../ui/date-picker";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useState } from "react";

export function OptionsMonthly() {
  const [reductionMonthly, setReductionMonthly] = useState<boolean>(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant='ghost'><MoreVertical /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setReductionMonthly(true)} className="cursor-pointer">
              Baixar mensalidade
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* reduction monthly */}
      <Dialog open={reductionMonthly} onOpenChange={() => setReductionMonthly(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Baixa de mensalidades</DialogTitle>
            <DialogDescription>Baixa das mensalidades dos usuários</DialogDescription>
          </DialogHeader>

          {/* content */}
          <div className="flex flex-col gap-3">
            <span>Usuário: Anderson Andrade</span>

            {/* payment value */}
            <div className="flex flex-col gap-3">
              <label htmlFor="">Valor do pagamento</label>
              <Input placeholder="R$50,00" />
            </div>

            {/* monthly due */}
            <div className="flex flex-col gap-3">
              <label htmlFor="">Data de pagamento</label>
              <DatePicker onSelect={() => { }} selected={new Date()} />
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
    </>
  )
}
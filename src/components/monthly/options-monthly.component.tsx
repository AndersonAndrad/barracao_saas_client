import { Check, MoreVertical, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Select, SelectContent, SelectGroup, SelectTrigger, SelectValue } from "../ui/select";

import { Button } from "../ui/button";
import { CopyToClipboard } from "../common/copy-clipboard.component";
import { DatePicker } from "../ui/date-picker";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useState } from "react";

export function OptionsMonthly() {
  const [reductionMonthly, setReductionMonthly] = useState<boolean>(false);
  const [updateMonthly, setUpdateMontlhy] = useState<boolean>(false);
  const [detailMonthly, setDetailMonthly] = useState<boolean>(false);

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
            <DropdownMenuItem onClick={() => setUpdateMontlhy(true)} className="cursor-pointer">
              Atulizar mensalidade
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDetailMonthly(true)} className="cursor-pointer">
              Detalhes da mensalidade
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

      {/* update monthly */}
      <Dialog open={updateMonthly} onOpenChange={() => setUpdateMontlhy(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Atualização de mensalidades</DialogTitle>
            <DialogDescription>Atualização das mensalidades dos usuários</DialogDescription>
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

      {/* detail monthly */}
      <Dialog open={detailMonthly} onOpenChange={() => setDetailMonthly(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes da mensalidades</DialogTitle>
            <DialogDescription>Detalhamento da mensalidade dos usuários</DialogDescription>
          </DialogHeader>

          {/* content */}
          <div className="flex flex-col gap-3">
            <span>Usuário: Anderson Andrade</span>
            <span>Código: 12345213 <CopyToClipboard payload="1234" /></span>
            <span>Valor da mensalidade:R$150,00</span>
            <span>Data de vencimento: Anderson Andrade</span>
            <span>Data de pagamento: Anderson Andrade</span>
            <span>Baixa efetuada por: Anderson Andrade</span>
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
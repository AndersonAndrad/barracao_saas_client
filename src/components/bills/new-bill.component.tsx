'use client';

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {Check, Plus} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Switch} from "@/components/ui/switch";
import {useState} from "react";
import {Textarea} from "@/components/ui/textarea";

export function NewBillComponent() {
    const [payment, setPayment] = useState<boolean>(false);

    return (
        <Sheet>
            <SheetTrigger>
                <Button>Registrar conta <Plus/></Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
                <SheetHeader>
                    <SheetTitle>Registrar conta</SheetTitle>
                    <SheetDescription>
                        Aqui você registra tanto entrada (lucro) quanto saída (despesas).
                        <br/>
                        <b>As informações opcionais estão destacadas.</b>
                    </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-3 flex-grow overflow-x-hidden overflow-y-auto">
                    {/* basic bill detail */}
                    <Accordion type='single' collapsible className="w-full">
                        <AccordionItem value='item-1'>
                            <AccordionTrigger>Detalhes da conta</AccordionTrigger>
                            <AccordionContent>
                                <div className="flex flex-col gap-3">
                                    {/* Bill number */}
                                    <label className='flex flex-col gap-2'>
                                        <span className='cursor-pointer'>Número da conta</span>
                                        <Input/>
                                    </label>


                                    {/* Due date */}
                                    <label className='flex flex-col gap-2'>
                                        <span className='cursor-pointer'>Data de vencimento</span>
                                        <Input/>
                                    </label>

                                    {/* Status && category */}
                                    <div className="flex gap-3">
                                        {/* status */}
                                        <label className='flex flex-col gap-2'>
                                            <span className='cursor-pointer'>Status da conta</span>
                                            <Input/>
                                        </label>

                                        {/* category */}
                                        <label className='flex flex-col gap-2'>
                                            <span className='cursor-pointer'>Categoria</span>
                                            <Input/>
                                        </label>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    {/* values bill */}
                    <Accordion type='single' collapsible className="w-full">
                        <AccordionItem value='item-1'>
                            <AccordionTrigger>Valores da conta</AccordionTrigger>
                            <AccordionContent>
                                <div className="flex flex-col gap-3">
                                    {/* Valor */}
                                    <label className='flex flex-col gap-2'>
                                        <span className='cursor-pointer'>Valor</span>
                                        <Input/>
                                    </label>

                                    {/* Payment method */}
                                    <label className='flex flex-col gap-2'>
                                        <span className='cursor-pointer'>Meio de pagamento</span>
                                        <Input/>
                                    </label>

                                    <label className='flex justify-between gap-2'>
                                        <span className='cursor-pointer'>Marcar conta como paga ?</span>
                                        <Switch id='payment' onClick={() => setPayment(!payment)}/>
                                    </label>

                                    {/* if payment is true @todo - change this to implement any payment want and limit to calculate bill amount */}
                                    {payment && (
                                        <>
                                            {/* amount paid */}
                                            <label className='flex flex-col gap-2'>
                                                <span className='cursor-pointer'>Valor pago</span>
                                                <Input/>
                                            </label>

                                            {/* date paid */}
                                            <label className='flex flex-col gap-2'>
                                                <span className='cursor-pointer'>Data de pagamento</span>
                                                <Input/>
                                            </label>

                                            {/* payment method */}
                                            <label className='flex flex-col gap-2'>
                                                <span className='cursor-pointer'>Metodo de pagamento </span>
                                                <Input/>
                                            </label>
                                        </>
                                    )}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    {/* payer details */}
                    <Accordion type='single' collapsible className="w-full">
                        <AccordionItem value='item-1'>
                            <AccordionTrigger>Detalhes do pagador (Opcional)</AccordionTrigger>
                            <AccordionContent>
                                <div className="flex flex-col gap-3">
                                    {/* Name */}
                                    <label className='flex flex-col gap-2'>
                                        <span className='cursor-pointer'>Nome</span>
                                        <Input/>
                                    </label>

                                    {/* Address */}
                                    <label className='flex flex-col gap-2'>
                                        <span className='cursor-pointer'>Endereço</span>
                                        <Input/>
                                    </label>

                                    {/* contact && document */}
                                    <div className="flex gap-3">
                                        {/* Contact */}
                                        <label className='flex flex-col gap-2'>
                                            <span className='cursor-pointer'>Contato</span>
                                            <Input/>
                                        </label>

                                        {/* Documento */}
                                        <label className='flex flex-col gap-2'>
                                            <span className='cursor-pointer'>Dcoumento</span>
                                            <Input placeholder='Exp: CPF / CNPJ'/>
                                        </label>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    {/* payee details */}
                    <Accordion type='single' collapsible className="w-full">
                        <AccordionItem value='item-1'>
                            <AccordionTrigger>Detalhes do beneficiário (Opcional)</AccordionTrigger>
                            <AccordionContent>
                                <div className="flex flex-col gap-3">
                                    {/* Name */}
                                    <label className='flex flex-col gap-2'>
                                        <span className='cursor-pointer'>Nome</span>
                                        <Input/>
                                    </label>

                                    {/* Address */}
                                    <label className='flex flex-col gap-2'>
                                        <span className='cursor-pointer'>Endereço</span>
                                        <Input/>
                                    </label>

                                    {/* contact && document */}
                                    <div className="flex gap-3">
                                        {/* Contact */}
                                        <label className='flex flex-col gap-2'>
                                            <span className='cursor-pointer'>Contato</span>
                                            <Input/>
                                        </label>

                                        {/* Documento */}
                                        <label className='flex flex-col gap-2'>
                                            <span className='cursor-pointer'>Dcoumento</span>
                                            <Input placeholder='Exp: CPF / CNPJ'/>
                                        </label>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    {/* Notes */}
                    <label className='flex flex-col gap-2'>
                        <span className='cursor-pointer'>Observações</span>
                        <Textarea placeholder='Adicione qualquer comentário necessário para sua conta' cols={20}
                                  className='resize-none'/>
                    </label>
                </div>
                <SheetFooter>
                    <Button>Salvar <Check/></Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
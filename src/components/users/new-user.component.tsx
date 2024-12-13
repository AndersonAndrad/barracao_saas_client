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
import {Check, Plus} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import {DatePicker} from "@/components/ui/date-picker";
import {generateHash} from "@/common/utils/hash.utils";
import {User} from "@/core/interfaces/user.interface";
import {UserApi} from "@/apis/user.api";

interface NewUserComponentProps {
    dispatch: () => void;
}

export function NewUserComponent({dispatch}: NewUserComponentProps) {
    const userApi = new UserApi();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [alias, setAlias] = useState("");
    const [phone, setPhone] = useState("");
    const [birthday, setBirthday] = useState<Date>(new Date());
    const [password, setPassword] = useState(generateHash().slice(0, 8));

    const submit = async (): Promise<void> => {
        const user: Omit<User, '_id'> = {
            name,
            email,
            alias,
            phone,
            birthday,
            password,
            confirmPassword: password
        } as Omit<User, '_id'>;

        await userApi.create(user).then(() => {
            clearStates();
            dispatch();
        });
    }

    const clearStates = (): void => {
        setName("");
        setEmail("");
        setAlias("");
        setPhone("");
        setPassword("");
    }

    return (
        <Sheet>
            <SheetTrigger>
                <Button>Novo macumbeirinho(a)<Plus/></Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Um novo macumbeirinho(a) 🥰</SheetTitle>
                    <SheetDescription>
                        Aqui vão ser inseridos as informações básicas para registrar um(a) novo(a) macumbeirinho(a)
                    </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-3">
                    {/* Name */}
                    <label className='flex flex-col gap-2'>
                        <span className='cursor-pointer'>Nome</span>
                        <Input onChange={(e) => setName(e.target.value)} value={name}/>
                    </label>

                    {/* Alias */}
                    <label className='flex flex-col gap-2'>
                        <span className='cursor-pointer'>Apelido</span>
                        <Input onChange={(e) => setAlias(e.target.value)} value={alias}/>
                    </label>

                    {/* Birthday */}
                    <label className='flex flex-col gap-2'>
                        <span className='cursor-pointer'>Aniversário</span>
                        <DatePicker onSelect={(date) => setBirthday(date)}/>
                    </label>

                    {/* phone */}
                    <label className='flex flex-col gap-2'>
                        <span className='cursor-pointer'>Telefone</span>
                        <Input onChange={(e) => setPhone(e.target.value)} value={phone}/>
                    </label>

                    {/* Email */}
                    <label className='flex flex-col gap-2'>
                        <span className='cursor-pointer'>Email</span>
                        <Input onChange={(e) => setEmail(e.target.value)} value={email}/>
                    </label>

                    {/* password */}
                    <label className='flex flex-col gap-2'>
                        <span className='cursor-pointer'>Senha temporária</span>
                        <Input onChange={(e) => setPassword(e.target.value)} value={password}/>
                    </label>
                </div>
                <SheetFooter className="pt-2">
                    <Button onClick={async () => await submit()}>Salvar <Check/></Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
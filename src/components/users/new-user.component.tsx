'use client';

import {
    Sheet,
    SheetClose,
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
import {User, UserStatus} from "@/core/interfaces/user.interface";
import {UserApi} from "@/apis/user.api";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {SelectOption} from "@/core/interfaces/common.interface";

interface NewUserComponentProps {
    dispatch: () => void;
}

export function NewUserComponent({dispatch}: NewUserComponentProps) {
    const [updating, setUpdating] = useState(false);

    const userApi = new UserApi();

    // User data
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [alias, setAlias] = useState("");
    const [phone, setPhone] = useState("");
    const [birthday, setBirthday] = useState<Date>(new Date());
    const [status, setStatus] = useState<string>();
    const [password, setPassword] = useState(generateHash().slice(0, 8));

    const submit = async (): Promise<void> => {
        const user: Omit<User, '_id'> = {
            name,
            email,
            alias,
            phone,
            birthday,
            password,
            confirmPassword: password,
            status,
        } as Omit<User, '_id'>;

        await userApi.create(user).then(() => {
            clearStates();
            dispatch();
        });
    }

    const userStatus: SelectOption[] = [
        {id: UserStatus.DISABLED, label: 'Fora do barracão'},
        {id: UserStatus.AWAY, label: 'Afastado do barracão'},
    ];

    const clearStates = (): void => {
        setName("");
        setEmail("");
        setAlias("");
        setPhone("");
        setPassword("");
        setStatus('');
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
                        <Input onChange={(event) => setName(event.target.value)} value={name}/>
                    </label>

                    {/* Alias */}
                    <label className='flex flex-col gap-2'>
                        <span className='cursor-pointer'>Apelido</span>
                        <Input onChange={(event) => setAlias(event.target.value)} value={alias}/>
                    </label>

                    {/* Birthday */}
                    <label className='flex flex-col gap-2'>
                        <span className='cursor-pointer'>Aniversário</span>
                        <DatePicker onSelect={(date) => setBirthday(date)}/>
                    </label>

                    {/* phone */}
                    <label className='flex flex-col gap-2'>
                        <span className='cursor-pointer'>Telefone</span>
                        <Input onChange={(event) => setPhone(event.target.value)} value={phone}/>
                    </label>

                    {/* Email */}
                    <label className='flex flex-col gap-2'>
                        <span className='cursor-pointer'>Email</span>
                        <Input onChange={(event) => setEmail(event.target.value)} value={email}/>
                    </label>

                    {/* Status - @warn: only when are updating */}
                    {updating &&
                        <label className='flex flex-col gap-2'>
                            <span className='cursor-pointer'>Status</span>
                            <Select onValueChange={(userStatus) => {
                                setStatus(userStatus)
                            }}>
                                <SelectTrigger>
                                    <SelectValue></SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {userStatus.map(userStatus => (
                                            <SelectItem key={userStatus.id} value={userStatus.id}>
                                                {userStatus.label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </label>
                    }

                    {/* password */}
                    <label className='flex flex-col gap-2'>
                        <span className='cursor-pointer'>Senha temporária</span>
                        <Input onChange={(event) => setPassword(event.target.value)} value={password}/>
                    </label>
                </div>
                <SheetFooter className="pt-2">
                    <SheetClose asChild>
                        <Button onClick={async () => await submit()}>Salvar <Check/></Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
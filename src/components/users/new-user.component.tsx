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
import {Check, Pencil, Plus, X} from "lucide-react";
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
    userToUpdate?: User;
}

export function NewUserComponent({dispatch, userToUpdate}: NewUserComponentProps) {
    const [updating, setUpdating] = useState(false);

    const userApi = new UserApi();

    // User data
    const [name, setName] = useState(userToUpdate?.name ?? '');
    const [email, setEmail] = useState(userToUpdate?.email ?? '');
    const [alias, setAlias] = useState(userToUpdate?.alias ?? '');
    const [phone, setPhone] = useState(userToUpdate?.phone ?? '');
    const [birthday, setBirthday] = useState<Date>(userToUpdate?.birthday ?? new Date());
    const [status, setStatus] = useState<string>(userToUpdate?.status ?? '');
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

        if (userToUpdate) {
            await userApi.updateOne(userToUpdate._id, user).then(() => {
                clearStates();
                dispatch();
            });
        } else {
            await userApi.create(user).then(() => {
                clearStates();
                dispatch();
            });
        }
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
                {/* when are creating a new user*/}
                {!userToUpdate && <Button>Novo macumbeirinho(a)<Plus/></Button>}

                {/* When are updating user */}
                {userToUpdate && <Button><Pencil/></Button>}
            </SheetTrigger>
            <SheetContent className='flex flex-col gap-3'>
                <SheetHeader>
                    {/* when are creating a new user*/}
                    {!userToUpdate && <SheetTitle>Um novo macumbeirinho(a) 🥰</SheetTitle>}

                    {/* when are updating the user */}
                    {userToUpdate && <SheetTitle>Atualizando um macumbeirinho(a) 🫡</SheetTitle>}
                    <SheetDescription>
                        Aqui vão ser inseridos as informações básicas para registrar/atualizar um(a) novo(a)
                        macumbeirinho(a)
                    </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-3 flex-grow">
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
                    {userToUpdate &&
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
                    {!userToUpdate && (
                        <label className='flex flex-col gap-2'>
                            <span className='cursor-pointer'>Senha temporária</span>
                            <Input onChange={(event) => setPassword(event.target.value)} value={password}/>
                        </label>
                    )}
                </div>
                <SheetFooter className="pt-2">
                    {/* Close without save anything */}
                    <SheetClose asChild>
                        <Button variant='ghost'>Cancelar <X/> </Button>
                    </SheetClose>

                    {/* if not exists user ?? Close after send user information to server */}
                    {!userToUpdate && (
                        <SheetClose asChild>
                            <Button onClick={async () => await submit()}>Salvar <Check/></Button>
                        </SheetClose>
                    )}

                    {/* if exists user ?? Close after send user information to server */}
                    {userToUpdate && (
                        <SheetClose asChild>
                            <Button onClick={async () => await submit()}>Atualizar <Pencil/></Button>
                        </SheetClose>
                    )}
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
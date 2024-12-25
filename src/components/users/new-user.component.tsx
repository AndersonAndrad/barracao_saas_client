'use client';

import {Check, Plus, X} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {generateHash, generateSmallHash} from "@/common/utils/hash.utils";
import {User, UserStatus} from "@/core/interfaces/user.interface";
import {UserApi} from "@/apis/user.api";
import {SelectOption} from "@/core/interfaces/common.interface";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {ColorObj, SelectColorsComponent} from "@/components/users/select-colors.component";

interface NewUserComponentProps {
    dispatch: () => void;
    userToUpdate?: User;
    label: string;
}

export function NewUserComponent(props: NewUserComponentProps) {
    const {dispatch, userToUpdate, label = 'Novo'} = props;
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
            delete (user as any).status;
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

    const colors: ColorObj[] = Array.from({length: 9}, (_, index) => {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        const hex: string = `#${randomColor.padStart(6, '0')}`;

        return {
            id: generateSmallHash(),
            hex,
            selected: index === 0,
        }
    });

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button><Plus/>{label}</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="font-bold">Cadastro</DialogTitle>
                    <DialogDescription>Cadastro de usuário para acesso a plataforma.</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-3">
                    {/* Full name */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="fullName">Nome completo</label>
                        <Input id="fullName"/>
                    </div>

                    <div className="flex gap-3">
                        {/* alias */}
                        <div className="flex w-full flex-col gap-1">
                            <label htmlFor="alias">Apelido</label>
                            <Input id="alias"/>
                        </div>

                        {/* phone */}
                        <div className="flex w-full flex-col gap-1">
                            <label htmlFor="phone">Telefone</label>
                            <Input id="phone"/>
                        </div>
                    </div>

                    {/* email */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email">Email</label>
                        <Input id="email"/>
                    </div>

                    <div className="flex gap-3">
                        {/* birthday */}
                        <div className="flex w-full flex-col gap-1">
                            <label htmlFor="birthday">Aniversário</label>
                            <Input id="birthday"/>
                        </div>

                        {/* temporary password */}
                        <div className="flex w-full flex-col gap-1">
                            <label htmlFor="temporaryPassword">Senha temporária</label>
                            <Input id="temporaryPassword"/>
                        </div>
                    </div>

                    {/* color */}
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="temporaryPassword">Qual a cor do seu Orixá?</label>
                        <SelectColorsComponent
                            colors={colors}
                            onSelectColor={(color) => {
                                console.log({color})
                            }}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="ghost">Cancelar <X/></Button>
                    <Button>Salvar <Check/></Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
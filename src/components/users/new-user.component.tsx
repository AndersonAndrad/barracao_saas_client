'use client';

import {Check, Plus, X} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {generateSmallHash} from "@/common/utils/hash.utils";
import {User} from "@/core/interfaces/user.interface";
import {UserApi} from "@/apis/user.api";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {ColorObj, SelectColorsComponent} from "@/components/users/select-colors.component";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {getInitials} from "@/common/utils/str.utils";
import {DatePicker} from "@/components/ui/date-picker";
import {UploadImage} from "@/components/common/upload-image.component";
import {readFile} from "@/common/utils/file.utils";

interface NewUserComponentProps {
    dispatch: () => void;
    userToUpdate?: User;
    label: string;
}

export function NewUserComponent(props: NewUserComponentProps) {
    const {dispatch, userToUpdate, label = 'Novo'} = props;
    const userApi = new UserApi();

    // User data
    const [name, setName] = useState(userToUpdate?.name ?? '');
    const [email, setEmail] = useState(userToUpdate?.email ?? '');
    const [alias, setAlias] = useState(userToUpdate?.alias ?? '');
    const [phone, setPhone] = useState(userToUpdate?.phone ?? '');
    const [birthday, setBirthday] = useState<Date>(userToUpdate?.birthday ?? new Date());
    const [status, setStatus] = useState<string>(userToUpdate?.status ?? '');
    const [password, setPassword] = useState(generateSmallHash());
    const [color, setColor] = useState<string>('');

    // File state
    const [file, setFile] = useState<any>(null);
    const [preview, setPreview] = useState<any>('');
    const [avatar, setAvatar] = useState('');

    const submit = async (): Promise<void> => {
        await readFile(file).then((result) => {
            setAvatar(JSON.stringify({image: result}))
        });

        const user: Omit<User, '_id' | 'status'> = {
            name,
            email,
            alias,
            phone,
            birthday,
            password,
            confirmPassword: password,
            color,
            avatar,
        } as Omit<User, '_id' | 'status'>;

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
                        <Input
                            id="fullName"
                            onChange={(event) => setName(event.target.value)}
                            value={name}
                        />
                    </div>

                    <div className="flex gap-3">
                        {/* alias */}
                        <div className="flex w-full flex-col gap-1">
                            <label htmlFor="alias">Apelido</label>
                            <Input
                                id="alias"
                                onChange={(event) => setAlias(event.target.value)}
                                value={alias}
                            />
                        </div>

                        {/* phone */}
                        <div className="flex w-full flex-col gap-1">
                            <label htmlFor="phone">Telefone</label>
                            <Input
                                id="phone"
                                onChange={(event) => setPhone(event.target.value)}
                                value={phone}
                            />
                        </div>
                    </div>

                    {/* email */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email">Email</label>
                        <Input
                            id="email"
                            onChange={(event) => setEmail(event.target.value)}
                            value={email}
                        />
                    </div>

                    <div className="flex gap-3">
                        {/* birthday */}
                        <div className="flex w-full flex-col gap-1">
                            <label htmlFor="birthday">Aniversário</label>
                            <DatePicker onSelect={setBirthday} selected={birthday}/>
                        </div>

                        {/* temporary password */}
                        <div className="flex w-full flex-col gap-1">
                            <label htmlFor="temporaryPassword">Senha temporária</label>
                            <Input
                                id="temporaryPassword"
                                onChange={(event) => setPassword(event.target.value)}
                                value={password}
                            />
                        </div>
                    </div>

                    {/* color */}
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="temporaryPassword">Qual a cor do seu Orixá?</label>
                        <SelectColorsComponent
                            colors={colors}
                            onSelectColor={setColor}
                        />
                    </div>

                    {/* Avatar */}
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="temporaryPassword">Foto de perfil</label>
                        <div className="flex gap-3 items-center">
                            <Avatar>
                                <AvatarImage src={preview}/>
                                <AvatarFallback>{getInitials(name)}</AvatarFallback>
                            </Avatar>
                            <UploadImage
                                onPreview={setPreview}
                                onUpload={setFile}
                                label="Selecionar foto"
                            />
                        </div>

                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="ghost">Cancelar <X/></Button>
                    </DialogClose>
                    <Button onClick={async () => await submit()}>Salvar <Check/></Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
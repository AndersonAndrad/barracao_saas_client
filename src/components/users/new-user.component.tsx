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
    label: string;
}

export function NewUserComponent(props: NewUserComponentProps) {
    const {dispatch, label = 'Novo'} = props;
    const userApi = new UserApi();

    // User data
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [alias, setAlias] = useState('');
    const [phone, setPhone] = useState('');
    const [birthday, setBirthday] = useState<Date>(new Date());
    const [password, setPassword] = useState(generateSmallHash());
    const [color, setColor] = useState<string>('');

    // File state
    const [file, setFile] = useState<any>(null);
    const [preview, setPreview] = useState<any>('');

    const submit = async (): Promise<void> => {
        const result = await readFile(file);


        const user: Omit<User, '_id' | 'status'> = {
            name,
            email,
            alias,
            phone,
            birthday,
            password,
            confirmPassword: password,
            color,
            avatar: JSON.stringify({image: result})
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
    }

    const colors: ColorObj[] = [
        {id: generateSmallHash(), hex: '#E2E7EE', selected: false},
        {id: generateSmallHash(), hex: '#92CEF7', selected: false},
        {id: generateSmallHash(), hex: '#BEB8FA', selected: false},
        {id: generateSmallHash(), hex: '#98DD98', selected: false},
        {id: generateSmallHash(), hex: '#ECDC83', selected: false},
        {id: generateSmallHash(), hex: '#C84A4A', selected: false},
        {id: generateSmallHash(), hex: '#A00A0A', selected: false},
        {id: generateSmallHash(), hex: '#73A8CC', selected: false},
        {id: generateSmallHash(), hex: '#878C93', selected: false},
    ];

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
                    <DialogClose asChild>
                        <Button onClick={async () => await submit()}>Salvar <Check/></Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
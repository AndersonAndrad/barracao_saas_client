'use client';

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {colors, FilterUser, UpdatePassword, User, UserStatus} from "@/core/interfaces/user.interface";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useEffect, useState} from "react";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {NewUserComponent} from "@/components/users/new-user.component";
import {PageTemplateComponent} from "@/components/common/page-template.component";
import {UserApi} from "@/apis/user.api";
import {getInitials} from "@/common/utils/str.utils";
import {debounce} from "next/dist/server/utils";
import {Pagination} from "@/components/common/pagination.component";
import {Skeleton} from "@/components/ui/skeleton";
import {formatPhoneNumber} from "@/common/utils/format.utils";
import {Check, EllipsisVertical, Eye, EyeClosed, X} from "lucide-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {DatePicker} from "@/components/ui/date-picker";
import {SelectColorsComponent} from "@/components/users/select-colors.component";
import {UploadImage} from "@/components/common/upload-image.component";
import {generateSmallHash} from "@/common/utils/hash.utils";
import {readFile} from "@/common/utils/file.utils";

export default function Page() {
    const userApi = new UserApi();

    const [users, setUsers] = useState<User[]>([]);

    const [searchWord, setSearchWord] = useState<string>("");
    const [previousFilter, setPreviousFilter] = useState<FilterUser>({page: 1, size: 10});
    const [totalItems, setTotalItems] = useState<number>(0);

    // Loading states
    const [loading, setLoading] = useState<boolean>(false);
    const [existsData, setExistsData] = useState<boolean>(false);

    // aux components states
    const [updatePasswordOpened, setUpdatePasswordOpened] = useState<boolean>(false);
    const [updateUserOpened, setUpdateUserOpened] = useState<boolean>(false);

    // Update user data
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [alias, setAlias] = useState('');
    const [phone, setPhone] = useState('');
    const [birthday, setBirthday] = useState<Date>(new Date());
    const [password, setPassword] = useState(generateSmallHash());
    const [color, setColor] = useState<string>('');
    const [userToUpdate, setUserToUpdate] = useState<User | null>(null);
    const [status, setStatus] = useState<UserStatus>();

    // Update user password
    const [confirmationPassword, setConfirmationPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [seeAllPassword, setSeeAllPassword] = useState<boolean>(false);

    // File state
    const [file, setFile] = useState<any>(null);
    const [preview, setPreview] = useState<any>('');

    const initUsers = async (filter?: FilterUser): Promise<void> => {
        const finalFilter = {page: 1, ...filter, size: 10}

        setLoading(true);

        const {items, total} = await userApi
            .find(finalFilter)
            .catch(() => ({items: [], total: 0}))
            .finally(() => {
                setPreviousFilter(finalFilter);
                setLoading(false);
            })

        const processedUsers = items.map((user) => {
            if (user.avatar) {
                try {
                    const avatarData = JSON.parse(user.avatar);
                    return {...user, avatar: avatarData.image};
                } catch {
                    return user;
                }
            }
            return user;
        });

        if (!existsData) setExistsData(!!total);

        setUsers(processedUsers);
        setTotalItems(total);
    };

    const searchUserByWord = async (word: string): Promise<void> => {
        if (!word || !word.trim().length) {
            const {word, ...rest} = previousFilter;
            await initUsers(rest);
            return;
        }

        word = word.trim().replace(/\s+/g, ' ');

        const searchWithDebounce = debounce(async (word: string) => {
            await initUsers({...previousFilter, word});
        }, 750)

        searchWithDebounce(word);
        setSearchWord(word);
    }

    const getUserStatus = (userStatus: UserStatus): string => {
        switch (userStatus) {
            case UserStatus.ENABLE:
                return "Ativo 🫡";
            case UserStatus.DISABLED:
                return "Inativo 🫥";
            case UserStatus.NEW:
                return "Novo(a)";
            case UserStatus.AWAY:
                return "Afastado 🫤";
            default:
                return "Novo(a)";
        }
    }

    const update = async () => {
        if (!userToUpdate) return;

        const result = await readFile(file);

        const userUpdate: Partial<User> = {
            ...userToUpdate,
            name,
            email,
            alias,
            phone,
            birthday,
            color,
            avatar: JSON.stringify({image: result}),
            status
        }

        await userApi.updateOne(userToUpdate._id, userUpdate)
            .then(() => {
                clearStates();
                initUsers();
            });
    }

    const clearStates = (): void => {
        setName("");
        setEmail("");
        setAlias("");
        setPhone("");
        setColor('');
    }

    const updatePassword = async (): Promise<void> => {
        if (!userToUpdate) return;

        const updatePassword: UpdatePassword = {
            password,
            newPassword,
            confirmationPassword
        }

        await userApi.updatePassword(userToUpdate._id, updatePassword)
            .then(() => {
                setUserToUpdate(null);
                setUpdatePasswordOpened(false);
                setPassword('');
                setNewPassword('');
                setConfirmationPassword('');
                initUsers();
            })
    }

    const prepareToUpdate = (user: User) => {
        setUpdateUserOpened(true);
        setUserToUpdate(user);

        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
        setBirthday(user.birthday);
        setAlias(user.alias);
        setColor(user.color);
    }

    useEffect(() => {
        initUsers();
    }, []);

    useEffect(() => {
        const handler = setTimeout(() => {
            searchUserByWord(searchWord);
        }, 750);

        return () => clearTimeout(handler); // Clear timeout on each change
    }, [searchWord]);

    return (
        <>
            {/* List users */}
            <PageTemplateComponent title='Usuários'>
                <div className="flex flex-col gap-3 h-full">
                    <header className="flex justify-end gap-3">
                        <div>
                            <Input
                                placeholder='Nome ou Apelido'
                                onChange={(event) => setSearchWord(event.target.value)}
                                value={searchWord}
                            />
                        </div>
                        <NewUserComponent label='Novo' dispatch={async () => await initUsers()}/>
                    </header>
                    <main className="flex flex-grow h-1 overflow-y-auto">
                        {/* When loading */}
                        {loading &&
                            <ul className="w-full">
                                {Array.from({length: 11}).map((_, index) => (
                                    <li key={index} className="mt-2 w-full">
                                        <div className="flex gap-3 justify-start items-center w-full">
                                            <Skeleton className="h-12 w-12 rounded-full"/>
                                            <div className="space-y-2 w-full">
                                                <Skeleton className="h-4 w-[100%]"/>
                                                <Skeleton className="h-4 w-[80%]"/>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        }

                        {/* When not exists any data */}
                        {(!loading && !existsData) &&
                            <div className="flex flex-col gap-3 justify-center items-center w-full text-center">
                                <span className="font-bold text-xl">Usuários nâo encontrados</span>
                                <span>Você ainda nâo cadastrou nenhum usuário, cadastre um novo usuãrio.</span>
                                <NewUserComponent
                                    label='Cadastrar novo usuário'
                                    dispatch={async () => await initUsers()}
                                />
                            </div>
                        }

                        {/* When exists data but not return anything */}
                        {(!loading && !users.length && searchWord.length) &&
                            <div className="flex flex-col gap-3 justify-center items-center w-full">
                                <span>Usuario não encontrado</span>
                                <span className="text-center">
                                {`Você pesquisou por "${searchWord}" mas não foi encontrado nenhum registro. Você pode fazer uma nova`}
                                    <br/>
                                    {` pesquisa ou cadastrar um novo usuário.`}
                            </span>
                                <div className="flex gap-3">
                                    <Button variant="secondary" onClick={() => {
                                    }}>Nova pesquisa</Button>
                                    <NewUserComponent
                                        label='Cadastrar novo usuário'
                                        dispatch={async () => await initUsers()}
                                    />
                                </div>
                            </div>
                        }

                        {/* When exists data and return users */}
                        {(!loading && users.length) &&
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nome</TableHead>
                                        <TableHead>Apelido</TableHead>
                                        <TableHead>Telefone</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow key={user._id}>
                                            <TableCell className='flex gap-3 items-center'>
                                                <Avatar>
                                                    <AvatarImage src={user.avatar}/>
                                                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                                                </Avatar>
                                                <div className='flex flex-col gap-1'>
                                                    <span className='text-base font-semibold'>{user?.name ?? '-'}</span>
                                                    <span className='text-xs'>{user?.email ?? '-'}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>{user?.alias ?? '-'}</TableCell>
                                            <TableCell>{formatPhoneNumber(user?.phone ?? '-')}</TableCell>
                                            <TableCell>{getUserStatus(user?.status)}</TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant='ghost'><EllipsisVertical/></Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent>
                                                        <DropdownMenuItem
                                                            className='cursor-pointer'
                                                            onClick={() => {
                                                                setUpdatePasswordOpened(true);
                                                                setUserToUpdate(user);
                                                            }}
                                                        >
                                                            Alterar senha
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            className='cursosr-pointer'
                                                            onClick={() => prepareToUpdate(user)}
                                                        >
                                                            Atualizar usuário
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        }
                    </main>
                    {existsData &&
                        <footer>
                            <Pagination
                                totalItems={totalItems}
                                currentPage={previousFilter.page}
                                onPageChange={async (page) => initUsers({...previousFilter, page})}
                            />
                        </footer>
                    }
                </div>
            </PageTemplateComponent>

            {/* ----- Aux components ----- */}

            {/* Update password */}
            <Dialog open={updatePasswordOpened} onOpenChange={() => setUpdatePasswordOpened(false)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Atualização de senha</DialogTitle>
                        <DialogDescription>Atualização de senha de acesso a plataforma</DialogDescription>
                    </DialogHeader>
                    <div className='flex flex-col gap-3'>
                        <header className='flex w-full justify-end'>
                            <Button
                                variant='ghost'
                                onClick={() => {
                                    setSeeAllPassword(!seeAllPassword)
                                }}
                            >
                                {seeAllPassword &&
                                    <span className='flex gap-3 items-center'>Esconder senhas <EyeClosed/></span>}
                                {!seeAllPassword && <span className='flex gap-3 items-center'>Ver senhas <Eye/></span>}
                            </Button>
                        </header>
                        <div className="flex flex-col gap-2 w-full">
                            <label className='cursor-pointer' htmlFor="currentPassword">Senha Atual</label>
                            <Input id="currentPassword" placeholder='Senha atual'
                                   type={seeAllPassword ? 'text' : 'password'} value={password} onChange={(event) => {
                                setPassword(event.target.value)
                            }}/>
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <label className='cursor-pointer' htmlFor="newPassword">Nova senha</label>
                            <Input id="newPassword" placeholder='Sua nova senha'
                                   type={seeAllPassword ? 'text' : 'password'} value={newPassword}
                                   onChange={(event) => {
                                       setNewPassword(event.target.value)
                                   }}/>
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <label className='cursor-pointer' htmlFor="confirmPassword">Confirme sua nova senha</label>
                            <Input id="confirmPassword" placeholder='Confirme sua nova senha'
                                   type={seeAllPassword ? 'text' : 'password'} value={confirmationPassword}
                                   onChange={(event) => {
                                       setConfirmationPassword(event.target.value)
                                   }}/>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant='ghost'>Cancelar <X/></Button>
                        </DialogClose>
                        <Button onClick={async () => await updatePassword()}>Salvar <Check/></Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Update user */}
            <Dialog open={updateUserOpened} onOpenChange={() => setUpdateUserOpened(false)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="font-bold">Atualização de cadastro</DialogTitle>
                        <DialogDescription>Atualização de dados cadastrais</DialogDescription>
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
                            <Button onClick={async () => await update()}>Salvar <Check/></Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
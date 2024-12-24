'use client';
import {PageTemplateComponent} from "@/components/common/page-template.component";
import {NewUserComponent} from "@/components/users/new-user.component";
import {UserApi} from "@/apis/user.api";
import {useEffect, useState} from "react";
import {FilterUser, User, UserStatus} from "@/core/interfaces/user.interface";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Input} from "@/components/ui/input";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";

export default function Page() {
    const userApi = new UserApi();

    const [users, setUsers] = useState<User[]>([]);
    const [cacheUsers, setCacheUsers] = useState<User[]>([]);

    const [searchWord, setSearchWord] = useState<string>("");
    const [existsData, setExistsData] = useState<boolean>(false);

    const initUsers = async (filter?: FilterUser): Promise<void> => {
        const {items} = await userApi.find({...filter, page: 1, size: 10}).catch(() => ({items: []}));

        setExistsData(!!items.length);

        setCacheUsers(items);

        setUsers(items);
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

    const getInitials = (fullName: string): string => {
        return fullName
            .split(' ')
            .map(word => word.charAt(0).toUpperCase())
            .join('');
    }

    useEffect(() => {
        initUsers();
    }, []);

    return (
        <PageTemplateComponent title='Usuários'>
            <div className="flex flex-col gap-3 h-full">
                <header className="flex justify-end gap-3">
                    <div>
                        <Input
                            placeholder='Nome ou Apelido'
                            onChange={(event) => {
                            }}
                            value={searchWord}
                        />
                    </div>
                    <NewUserComponent label='Novo' dispatch={async () => await initUsers()}/>
                </header>
                <main className="flex flex-grow h-full">
                    {(existsData && !users.length) &&
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
                    {(existsData && users.length) &&
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
                                                <AvatarImage src='https://github.com/shadcn.png'/>
                                                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                                            </Avatar>
                                            <div className='flex flex-col gap-1'>
                                                <span className='text-base font-semibold'>{user?.name ?? '-'}</span>
                                                <span className='text-xs'>{user?.email ?? '-'}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{user?.alias ?? '-'}</TableCell>
                                        <TableCell>{user?.phone ?? '-'}</TableCell>
                                        <TableCell>{getUserStatus(user?.status)}</TableCell>
                                        <TableCell>
                                            <NewUserComponent userToUpdate={user}
                                                              dispatch={async () => await initUsers()}/>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    }
                </main>
                <footer className="flex justify-between">
                    <Button variant='ghost'>Anterior</Button>
                    <span>1/10</span>
                    <Button variant='ghost'>Próxima</Button>
                </footer>
            </div>
        </PageTemplateComponent>
    )
}
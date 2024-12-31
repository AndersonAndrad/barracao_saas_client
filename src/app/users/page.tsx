'use client';

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {FilterUser, User, UserStatus} from "@/core/interfaces/user.interface";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useEffect, useState} from "react";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {NewUserComponent} from "@/components/users/new-user.component";
import {PageTemplateComponent} from "@/components/common/page-template.component";
import {UserApi} from "@/apis/user.api";
import {getInitials} from "@/common/utils/str.utils";
import {debounce} from "next/dist/server/utils";

export default function Page() {
    const userApi = new UserApi();

    const [users, setUsers] = useState<User[]>([]);

    const [searchWord, setSearchWord] = useState<string>("");
    const [existsData, setExistsData] = useState<boolean>(false);
    const [previousFilter, setPreviousFilter] = useState<FilterUser>({page: 1, size: 10});

    const initUsers = async (filter?: FilterUser): Promise<void> => {
        const finalFilter = {page: 1, ...filter, size: 10}

        const {items, total} = await userApi
            .find(finalFilter)
            .catch(() => ({items: [], total: 0}))
            .finally(() => {
                setPreviousFilter(finalFilter)
            })

        setExistsData(!!total);

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

        setUsers(processedUsers);
    };

    const searchUserByWord = async (word: string): Promise<void> => {
        if (!word || !word.trim().length) {
            const {word, ...rest} = previousFilter;
            await initUsers(rest);
            return;
        }

        word = word.trim().replace(/\s+/g, ' ');

        const method = debounce(async (word: string) => {
            await initUsers({...previousFilter, word});
        }, 750)

        method(word);
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
                <main className="flex flex-grow h-full">
                    {/* When not exists any data */}
                    {!existsData &&
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

                    {/* When exists data and return users */}
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
                                                <AvatarImage src={user.avatar}/>
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

                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    }
                </main>
                {existsData &&
                    <footer className="flex justify-between">
                        <Button variant='ghost'>Anterior</Button>
                        <span>1/10</span>
                        <Button variant='ghost'>Próxima</Button>
                    </footer>
                }
            </div>
        </PageTemplateComponent>
    )
}
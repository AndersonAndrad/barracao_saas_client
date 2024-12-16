'use client';
import {PageTemplateComponent} from "@/components/common/page-template.component";
import {NewUserComponent} from "@/components/users/new-user.component";
import {UserApi} from "@/apis/user.api";
import {useEffect, useState} from "react";
import {User, UserStatus} from "@/core/interfaces/user.interface";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {formatDate} from "@/common/utils/date.utils";

export default function Page() {
    const userApi = new UserApi();

    const [users, setUsers] = useState<User[]>([]);

    const initUsers = async (): Promise<void> => {
        const {items} = await userApi.find({page: 1, size: 10}).catch(() => ({items: []}));

        setUsers(items);
    }

    const getUserStatus = (userStatus: UserStatus): string => {
        switch (userStatus) {
            case UserStatus.ENABLE:
                return "Ativo 🫡";
            case UserStatus.DISABLED:
                return "Inativo 🫥";
            case UserStatus.NEW:
                return "Novo 🥰";
            case UserStatus.AWAY:
                return "Afastado 🫤";
            default:
                return "Novo 🥰";
        }
    }

    useEffect(() => {
        initUsers();
    }, []);

    return (
        <PageTemplateComponent title='Macumbeirinhos(as)'>
            <div className="flex flex-col gap-3">
                <header className="flex justify-end">
                    <NewUserComponent dispatch={async () => await initUsers()}/>
                </header>
                <main>
                    <Table>
                        <TableCaption>Todos os macumbeirinhos(as) registrados</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nome</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Telefone</TableHead>
                                <TableHead>Aniversário</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user?.phone ?? '-'}</TableCell>
                                    <TableCell>{formatDate(user?.birthday)}</TableCell>
                                    <TableCell>{getUserStatus(user?.status)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </main>
                <footer></footer>
            </div>
        </PageTemplateComponent>
    )
}
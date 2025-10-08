// https://tailwindcomponents.com/component/hoverable-table
import { PageTitle } from '@/components';

import { redirect } from 'next/navigation';
import UsersTable from './ui/UsersTable';
import { getPaginaterUsers } from '@/actions';
import Pagination from '@/components/ui/pagination/Pagination';

export default async function OrdersPage() {


    // Server acction
    const { ok, users = [] } = await getPaginaterUsers();

    // if (!ok) {
    //     redirect("/auth/login");
    // }

    return (
        <div className="p-4 mb-20 h-screen">
            <PageTitle title="Users Management" />

            <div className="mb-10">
                <UsersTable users={users} />
                <Pagination totalPages={Math.ceil(users.length / 20)} />
            </div>
        </div>
    );
}
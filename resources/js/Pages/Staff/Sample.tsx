import AuthenticatedLayout from '@/Layouts/StaffAuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Sample
                </h2>
            }
        >
            <Head title="Sample" />

            <div className="PageContainer">
                <div className="PageWrapper">
                    <div className="Page">
                        <div className="PageContent">
                            Sample Page!
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

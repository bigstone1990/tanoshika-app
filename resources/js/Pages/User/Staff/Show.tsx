import AuthenticatedLayout from '@/Layouts/UserAuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import FlashMessage from '@/Components/FlashMessage';

type ShowProps = {
    flash: {
        status: string;
        message: string;
    };
    staff: {
        id: number;
        name: string;
        kana: string;
        email: string;
        user_id: number;
        user_name: string;
    };
};

export default function Show({flash, staff}: ShowProps) {

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    スタッフ詳細
                </h2>
            }
        >
            <Head title="スタッフ詳細" />

            <FlashMessage flash={flash} />
            <div className="PageContainer">
                <div className="PageWrapper">
                    <div className="Page">
                        <div className="PageContent">
                            <section className="text-gray-600 body-font relative">
                                <div className="container mx-auto">
                                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                                        <div className="flex flex-col">
                                            <div className="p-2 w-full">
                                                <div className="relative">
                                                    <p className="block text-sm font-medium text-gray-700 leading-7">名前</p>

                                                    <p className="rounded-md border-gray-300 shadow-sm mt-1 block w-full bg-gray-100 bg-opacity-50 border text-base text-gray-700 py-1 px-3 leading-8">{staff.name}</p>
                                                </div>
                                            </div>

                                            <div className="p-2 w-full">
                                                <div className="relative">
                                                    <div className="relative">
                                                        <p className="block text-sm font-medium text-gray-700 leading-7">かな</p>

                                                        <p className="rounded-md border-gray-300 shadow-sm mt-1 block w-full bg-gray-100 bg-opacity-50 border text-base text-gray-700 py-1 px-3 leading-8">{staff.kana}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-2 w-full">
                                                <div className="relative">
                                                    <div className="relative">
                                                        <p className="block text-sm font-medium text-gray-700 leading-7">メールアドレス</p>

                                                        <p className="rounded-md border-gray-300 shadow-sm mt-1 block w-full bg-gray-100 bg-opacity-50 border text-base text-gray-700 py-1 px-3 leading-8">{staff.email}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-2 w-full">
                                                <div className="relative">
                                                    <div className="relative">
                                                        <p className="block text-sm font-medium text-gray-700 leading-7">所属事業所</p>

                                                        <p className="rounded-md border-gray-300 shadow-sm mt-1 block w-full bg-gray-100 bg-opacity-50 border text-base text-gray-700 py-1 px-3 leading-8">{staff.user_id ? staff.user_name : '未所属'}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-2 w-full flex gap-4 justify-center">
                                                <Link as="button" href={route('user.staff.index')} className="text-white bg-gray-500 border-0 py-2 px-8 hover:bg-gray-600 rounded">一覧に戻る</Link>
                                                <Link as="button" href={route('user.staff.edit', {staff: staff.id})} className="text-white bg-indigo-500 border-0 py-2 px-8 hover:bg-indigo-600 rounded">編集する</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

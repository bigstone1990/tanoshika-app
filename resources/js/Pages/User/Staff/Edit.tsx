import AuthenticatedLayout from '@/Layouts/UserAuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectBox from '@/Components/SelectBox'
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

type EditProps = {
    staff: {
        id: number;
        user_id: number;
        name: string;
        kana: string;
        email: string;
    };
    users: {
        id: number;
        name: string;
    }[];
}

export default function Edit({staff, users}: EditProps) {
    const usersProps = users.map(user => ({
        label: user.name,
        value: String(user.id),
    }));

    const { data, setData, put, errors } = useForm({
        name: staff.name,
        kana: staff.kana,
        affiliation: String(staff.user_id),
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('user.staff.update', {staff: staff.id}));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    スタッフ編集
                </h2>
            }
        >
            <Head title="スタッフ編集" />

            <div className="PageContainer">
                <div className="PageWrapper">
                    <div className="Page">
                        <div className="PageContent">
                            <section className="text-gray-600 body-font relative">
                                <div className="container mx-auto">
                                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                                        <div className="flex flex-col">
                                            <form onSubmit={submit}>
                                                <div className="p-2 w-full">
                                                    <div className="relative">
                                                        <InputLabel htmlFor="name" className="leading-7 text-sm text-gray-600">
                                                            名前 <span className="text-red-600">*必須項目</span>
                                                        </InputLabel>

                                                        <TextInput
                                                            id="name"
                                                            name="name"
                                                            value={data.name}
                                                            className="mt-1 block w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                            autoComplete="name"
                                                            isFocused={true}
                                                            onChange={(e) => setData('name', e.target.value)}
                                                            required
                                                        />

                                                        <InputError message={errors.name} className="mt-2" />
                                                    </div>
                                                </div>

                                                <div className="p-2 w-full">
                                                    <div className="relative">
                                                        <InputLabel htmlFor="kana" className="leading-7 text-sm text-gray-600">
                                                            かな <span className="text-red-600">*必須項目</span>
                                                        </InputLabel>

                                                        <TextInput
                                                            id="kana"
                                                            name="kana"
                                                            value={data.kana}
                                                            className="mt-1 block w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                            autoComplete="kana"
                                                            onChange={(e) => setData('kana', e.target.value)}
                                                            required
                                                        />

                                                        <InputError message={errors.kana} className="mt-2" />
                                                    </div>
                                                </div>

                                                <div className="p-2 w-full">
                                                    <div className="relative">
                                                        <div className="relative">
                                                            <p className="block text-sm font-medium text-gray-700 leading-7">メールアドレス <span className="text-red-600">*変更不可</span></p>

                                                            <p className="rounded-md border-gray-300 shadow-sm mt-1 block w-full bg-gray-100 bg-opacity-50 border text-base text-gray-700 py-1 px-3 leading-8">{staff.email}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="p-2 w-full">
                                                    <div className="relative">
                                                        <InputLabel htmlFor="affiliation" className="leading-7 text-sm text-gray-600">
                                                            所属事業所
                                                        </InputLabel>

                                                        <SelectBox
                                                            id="affiliation"
                                                            name="affiliation"
                                                            value={data.affiliation}
                                                            className="mt-1 block w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                            options={usersProps}
                                                            onChange={(e) => setData('affiliation', e.target.value)}
                                                        />

                                                        <InputError message={errors.affiliation} className="mt-2" />
                                                    </div>
                                                </div>

                                                <div className="p-2 w-full flex gap-4 justify-center">
                                                    <Link as="button" href={route('user.staff.show', {staff: staff.id})} className="text-white bg-gray-500 border-0 py-2 px-8 hover:bg-gray-600 rounded">詳細に戻る</Link>
                                                    <button className="text-white bg-indigo-500 border-0 py-2 px-8 hover:bg-indigo-600 rounded">更新する</button>
                                                </div>
                                            </form>
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

import AuthenticatedLayout from '@/Layouts/UserAuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import styled from 'styled-components'

const StyledUserAuthorityContainer = styled.div`
    flex: 0 1 calc(calc(100% - 1rem) / 2);
    padding-left: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid #d1d5db;
    box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05);
    background-color: #f3f4f6;

    &.IsChecked {
        background-color: #5cb85c;
        border-color: #5cb85c;
    }
`;

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        kana: '',
        email: '',
        authority: '9',
    });

    const submit: FormEventHandler = (e) => {
            e.preventDefault();
    
            post(route('user.users.store'));
        };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    事業所新規作成
                </h2>
            }
        >
            <Head title="事業所新規作成" />

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
                                                        <InputLabel htmlFor="name" value="名前" className="leading-7 text-sm text-gray-600" />

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
                                                        <InputLabel htmlFor="kana" value="かな" className="leading-7 text-sm text-gray-600" />

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
                                                        <InputLabel htmlFor="email" value="メールアドレス" className="leading-7 text-sm text-gray-600" />

                                                        <TextInput
                                                            id="email"
                                                            type="email"
                                                            name="email"
                                                            value={data.email}
                                                            className="mt-1 block w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                            autoComplete="email"
                                                            onChange={(e) => setData('email', e.target.value)}
                                                            required
                                                        />

                                                        <InputError message={errors.email} className="mt-2" />
                                                    </div>
                                                </div>

                                                <div className="p-2 w-full">
                                                    <div className="relative">
                                                        <p className="block text-sm font-medium text-gray-700 leading-7">権限</p>
                                                        <div className="flex gap-4">
                                                            <StyledUserAuthorityContainer className={data.authority === '1' ? 'IsChecked' : ''}>
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="authorityAdmin"
                                                                        type="radio"
                                                                        name="authority"
                                                                        value="1"
                                                                        checked={data.authority === '1'}
                                                                        onChange={(e) => setData('authority', e.target.value)}
                                                                    />
                                                                    <InputLabel htmlFor="authorityAdmin" value="管理者" className={`flex-auto pl-2 py-4 leading-7 text-sm text-gray-600 select-none ${data.authority === '1' ? 'text-white' : ''}`}/>
                                                                </div>
                                                            </StyledUserAuthorityContainer>
                                                            <StyledUserAuthorityContainer className={data.authority === '9' ? 'IsChecked' : ''}>
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="authorityUser"
                                                                        type="radio"
                                                                        name="authority"
                                                                        value="9"
                                                                        checked={data.authority === '9'}
                                                                        onChange={(e) => setData('authority', e.target.value)}
                                                                    />
                                                                    <InputLabel htmlFor="authorityUser" value="一般" className={`flex-auto pl-2 py-4 leading-7 text-sm text-gray-600 select-none ${data.authority === '9' ? 'text-white' : ''}`} />
                                                                </div>
                                                            </StyledUserAuthorityContainer>
                                                        </div>
                                                        <InputError message={errors.authority} className="mt-2" />
                                                    </div>
                                                </div>

                                                <div className="p-2 w-full flex gap-4 justify-center">
                                                    <Link as="button" href={route('user.users.index')} className="text-white bg-gray-500 border-0 py-2 px-8 hover:bg-gray-600 rounded">一覧に戻る</Link>
                                                    <button className="text-white bg-indigo-500 border-0 py-2 px-8 hover:bg-indigo-600 rounded">作成する</button>
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

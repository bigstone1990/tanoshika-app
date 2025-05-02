import AuthenticatedLayout from '@/Layouts/UserAuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Modal from '@/Components/Modal';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
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

type EditProps = {
    user: {
        id: number;
        name: string;
        kana: string;
        email: string;
        authority: number;
        isSelf: boolean;
    };
}

export default function Edit({user}: EditProps) {
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);

    const { data, setData, put, delete: destroy, errors } = useForm({
        name: user.name,
        kana: user.kana,
        authority: String(user.authority),
    });

    const confirmDeletion = () => {
        setConfirmingDeletion(true);
    };

    const deleteItem: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('user.users.destroy', {user: user.id}), {
            onFinish: () => closeModal(),
        });
    };

    const closeModal = () => {
        setConfirmingDeletion(false);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('user.users.update', {user: user.id}));
    };


    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    事業所編集
                </h2>
            }
        >
            <Head title="事業所編集" />

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
                                                        <div className="relative">
                                                            <p className="block text-sm font-medium text-gray-700 leading-7">メールアドレス</p>

                                                            <p className="rounded-md border-gray-300 shadow-sm mt-1 block w-full bg-gray-100 bg-opacity-50 border text-base text-gray-700 py-1 px-3 leading-8">{user.email}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {!user.isSelf ? (
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
                                                ) : (
                                                    <div className="p-2 w-full">
                                                        <div className="relative">
                                                            <div className="relative">
                                                                <p className="block text-sm font-medium text-gray-700 leading-7">権限</p>

                                                                <p className="rounded-md border-gray-300 shadow-sm mt-1 block w-full bg-gray-100 bg-opacity-50 border text-base text-gray-700 py-1 px-3 leading-8">{user.authority === 1 ? '管理者' : user.authority === 9 ? '一般' : 'その他'}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="p-2 w-full flex gap-4 justify-center">
                                                    <Link as="button" href={route('user.users.show', {user: user.id})} className="text-white bg-gray-500 border-0 py-2 px-8 hover:bg-gray-600 rounded">詳細に戻る</Link>
                                                    <button className="text-white bg-indigo-500 border-0 py-2 px-8 hover:bg-indigo-600 rounded">更新する</button>
                                                    {!user.isSelf ? <button type="button" onClick={confirmDeletion} className="text-white bg-red-500 border-0 py-2 px-8 hover:bg-red-600 rounded">削除する</button> : <></>}
                                                </div>
                                            </form>
                                            <Modal show={confirmingDeletion} onClose={closeModal}>
                                                <form onSubmit={deleteItem} className="p-6">
                                                    <h2 className="text-lg font-medium text-gray-900">
                                                        このアカウントを本当に削除しますか？
                                                    </h2>
                                
                                                    <p className="mt-1 text-sm text-gray-600">
                                                        このアカウントに紐づいているデータが全て完全に削除されます。
                                                    </p>
                                
                                                    <div className="mt-4 w-full flex gap-4 justify-center">
                                                        <button type="button" onClick={closeModal} className="text-white bg-gray-500 border-0 py-2 px-8 hover:bg-gray-600 rounded">
                                                            キャンセル
                                                        </button>
                                
                                                        <button className="text-white bg-red-500 border-0 py-2 px-8 hover:bg-red-600 rounded">
                                                            アカウントを削除する
                                                        </button>
                                                    </div>
                                                </form>
                                            </Modal>
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

import AuthenticatedLayout from '@/Layouts/UserAuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import styled from 'styled-components'
import { Breakpoints } from '@/common';
import FlashMessage from '@/Components/FlashMessage';

type IndexProps = {
  auth: {
    permissions: {
      adminUser: boolean;
    };
  };
  flash: {
    status: string;
    message: string;
  };
  users: {
    id: number;
    name: string;
    email: string;
    authority: number;
  }[];
}

const StyledUserTableContainer = styled.div`
  max-width: calc(6rem + 10rem + 15rem + 6rem + 1rem);
  max-height: 410px;
  overflow-x: auto;
  overflow-y: auto;
  margin-left: auto;
  margin-right: auto;

  @media screen and (min-height: ${Breakpoints.SmartphoneWide}) {
    max-height: calc(100vh - 257px - 1px);
  }
  
  table {
    border-collapse: separate;
    border-spacing: 0;

    thead {
      tr {
        th {
          overflow-wrap: break-word;
          position: relative;

          &:first-of-type::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-right: 1px solid white;  
          }

          &:first-of-type {
            position: sticky;
            top: 0;
            left: 0;
            z-index: 3;
          }

          &:not(:first-of-type) {
            position: sticky;
            top: 0;
            z-index: 2;
          }
        }
      }
    }

    tbody {
      tr {
        td {
          overflow-wrap: break-word;

          &:first-of-type {
            position: sticky;
            left: 0;
            z-index: 1;
          }
        }
      }
    }
  }
`;

export default function Index({auth, flash, users}: IndexProps) {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          事業所管理
        </h2>
      }
    >
      <Head title="事業所管理" />

      <FlashMessage flash={flash} />
      <div className="PageContainer">
        <div className="PageWrapper">
          <div className="Page">
            <div className="PageContent">
              <section className="text-gray-600">
                <div className="container mx-auto">
                  <div className="w-full mx-auto overflow-auto">
                    <div className={`flex gap-4 justify-end w-full ${auth.permissions.adminUser ? 'mb-4' : 'mb-14'}`}>
                      {auth.permissions.adminUser ? <Link as="button" href={route('user.users.create')} className="text-white bg-indigo-500 border-0 py-2 px-8 hover:bg-indigo-600 rounded">新規作成</Link> : <></>}
                    </div>
                    <StyledUserTableContainer>
                      <table className="table-fixed w-full text-left whitespace-normal">
                        <thead>
                          <tr>
                            <th className="w-24 px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-900 rounded-tl rounded-bl">操作</th>
                            <th className="w-40 px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-900">事業所名</th>
                            <th className="w-60 px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-900">代表メールアドレス</th>
                            <th className="w-24 px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-900 rounded-tr rounded-br">権限</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.length !== 0 ?
                            users.map(user => (
                              <tr key={ user.id }>
                                <td className="border-b-2 px-4 py-3 bg-white">
                                  <Link as="button" href={route('user.users.show', {user: user.id})} className="w-full text-white bg-sky-500 border-0 py-2 px-4 hover:bg-sky-600 rounded">詳細</Link>
                                </td>
                                <td className="border-b-2 px-4 py-3 bg-white">{user.name}</td>
                                <td className="border-b-2 px-4 py-3 bg-white">{user.email}</td>
                                <td className="border-b-2 px-4 py-3 bg-white">
                                  {user.authority === 1 ? '管理者' : user.authority === 9 ? '一般' : 'その他'}
                                </td>
                              </tr>
                            )) :
                            <tr>
                              <td className="border-b-2 px-4 py-3 bg-white"></td>
                              <td className="border-b-2 px-4 py-3 bg-white">事業所がありません</td>
                              <td className="border-b-2 px-4 py-3 bg-white"></td>
                              <td className="border-b-2 px-4 py-3 bg-white"></td>
                            </tr>
                            }
                        </tbody>
                      </table>
                    </StyledUserTableContainer>
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

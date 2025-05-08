import AuthenticatedLayout from '@/Layouts/StaffAuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import styled from 'styled-components'
import { Breakpoints } from '@/common';
import FlashMessage from '@/Components/FlashMessage';

type IndexProps = {
  flash: {
    status: string;
    message: string;
  };
  members: {
    id: number;
    name: string;
    email: string;
    user_id: number;
    user_name: string;
  }[];
};

const StyledMemberTableContainer = styled.div`
  max-width: calc(6rem + 10rem + 15rem + 10rem + 1rem + 1px);
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
        }

        &:first-of-type {
          th {
            &::before {
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

export default function Index({flash, members}: IndexProps) {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          メンバー管理
        </h2>
      }
    >
      <Head title="メンバー管理" />

      <FlashMessage flash={flash} />
      <div className="PageContainer">
        <div className="PageWrapper">
          <div className="Page">
            <div className="PageContent">
              <section className="text-gray-600">
                <div className="container mx-auto">
                  <div className="w-full mx-auto overflow-auto">
                    <div className="flex gap-4 justify-end w-full mb-4">
                      <Link as="button" href={route('staff.members.create')} className="text-white bg-indigo-500 border-0 py-2 px-8 hover:bg-indigo-600 rounded">新規作成</Link>
                    </div>
                    <StyledMemberTableContainer>
                      <table className="table-fixed w-full text-left whitespace-normal">
                        <thead>
                          <tr>
                            <th className="w-24 px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-900 rounded-tl rounded-bl">操作</th>
                            <th className="w-40 px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-900">メンバー名</th>
                            <th className="w-60 px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-900">メールアドレス</th>
                            <th className="w-40 px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-900 rounded-tr rounded-br">所属事業所</th>
                          </tr>
                        </thead>
                        <tbody>
                          {members.length !== 0 ?
                            members.map(member => (
                              <tr key={ member.id }>
                                <td className="border-b-2 px-4 py-3 bg-white">
                                  <Link as="button" href={route('staff.members.show', {member: member.id})} className="w-full text-white bg-sky-500 border-0 py-2 px-4 hover:bg-sky-600 rounded">詳細</Link>
                                </td>
                                <td className="border-b-2 px-4 py-3 bg-white">{member.name}</td>
                                <td className="border-b-2 px-4 py-3 bg-white">{member.email}</td>
                                <td className="border-b-2 px-4 py-3 bg-white">
                                  {member.user_id ? member.user_name : <>-</>}
                                </td>
                              </tr>
                            )) :
                            <tr>
                              <td className="border-b-2 px-4 py-3 bg-white"></td>
                              <td className="border-b-2 px-4 py-3 bg-white">メンバーがいません</td>
                              <td className="border-b-2 px-4 py-3 bg-white"></td>
                              <td className="border-b-2 px-4 py-3 bg-white"></td>
                            </tr>
                            }
                        </tbody>
                      </table>
                    </StyledMemberTableContainer>
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

import AuthenticatedLayout from '@/Layouts/StaffAuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import styled from 'styled-components'
import { Breakpoints } from '@/common';

type IndexProps = {
  members: {
    id: number;
    name: string;
  }[];
};

const StyledMemberReportTableContainer = styled.div`
  max-width: calc(10rem + 16rem + 1rem + 1px);
  max-height: 466px;
  overflow-x: auto;
  overflow-y: auto;
  margin-left: auto;
  margin-right: auto;

  @media screen and (min-height: ${Breakpoints.SmartphoneWide}) {
    max-height: calc(100vh - 201px - 1px);
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

export default function Index({members}: IndexProps) {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          メンバー報告書管理
        </h2>
      }
    >
      <Head title="メンバー報告書管理" />

      <div className="PageContainer">
        <div className="PageWrapper">
          <div className="Page">
            <div className="PageContent">
              <section className="text-gray-600">
                <div className="container mx-auto">
                  <div className="w-full mx-auto overflow-auto">
                    <StyledMemberReportTableContainer>
                      <table className="table-fixed w-full text-left whitespace-normal">
                        <thead>
                          <tr>
                            <th className="w-40 px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-900 rounded-tl rounded-bl">メンバー名</th>
                            <th className="w-64 px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-900 rounded-tr rounded-br">報告書</th>
                          </tr>
                        </thead>
                        <tbody>
                          {members.length !== 0 ?
                            members.map(member => (
                              <tr key={ member.id }>
                                <td className="border-b-2 px-4 py-3 bg-white">
                                  {member.name}
                                </td>
                                <td className="border-b-2 px-4 py-3 bg-white flex justify-between gap-4">
                                  <Link as="button" href={route('staff.memberDailyReports.index', {member: member.id})} className="text-white bg-sky-500 border-0 py-2 px-4 hover:bg-sky-600 rounded">日報</Link>
                                  <Link as="button" href={route('staff.memberWeeklyReports.index', {member: member.id})} className="text-white bg-sky-500 border-0 py-2 px-4 hover:bg-sky-600 rounded">週報</Link>
                                  <Link as="button" href={route('staff.memberMonthlyReports.index', {member: member.id})} className="text-white bg-sky-500 border-0 py-2 px-4 hover:bg-sky-600 rounded">月報</Link>
                                </td>
                              </tr>
                            )) :
                            <tr>
                              <td className="border-b-2 px-4 py-3 bg-white">メンバーがいません</td>
                              <td className="border-b-2 px-4 py-3 bg-white"></td>
                            </tr>
                            }
                        </tbody>
                      </table>
                    </StyledMemberReportTableContainer>
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

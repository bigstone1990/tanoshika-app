import AuthenticatedLayout from '@/Layouts/MemberAuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import styled from 'styled-components'
import FlashMessage from '@/Components/FlashMessage';
import { Paginate } from '@/types'
import Pagination from '@/Components/Pagination'

type Report = {
  id: string
  date: string
  submitted_at: string | null
}

type IndexProps = {
  flash: {
    status: string
    message: string
  }
  reports: Paginate<Report>
}

const StyledMemberDailyReportTableContainer = styled.div`
  max-width: calc(6rem + 10rem + 10rem + 1rem + 1px);
  overflow-x: auto;
  overflow-y: auto;
  margin-left: auto;
  margin-right: auto;

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
`

export default function Index({flash, reports}: IndexProps) {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          日報管理
        </h2>
      }
    >
      <Head title="日報管理" />

      <FlashMessage flash={flash} />
      <div className="PageContainer">
        <div className="PageWrapper">
          <div className="Page">
            <div className="PageContent">
              <section className="text-gray-600">
                <div className="container mx-auto">
                  <div className="w-full mx-auto overflow-auto">
                    <div className="flex gap-4 justify-end w-full mb-4">
                      <Link as="button" href={route('member.dailyreports.create')} className="text-white bg-indigo-500 border-0 py-2 px-8 hover:bg-indigo-600 rounded">新規作成</Link>
                    </div>
                    <StyledMemberDailyReportTableContainer>
                      <table className="table-fixed w-full text-left whitespace-normal">
                        <thead>
                          <tr>
                            <th className="w-24 px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-900 rounded-tl rounded-bl">操作</th>
                            <th className="w-40 px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-900">日付</th>
                            <th className="w-40 px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm bg-gray-900 rounded-tr rounded-br">ステータス</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reports.data.length !== 0 ?
                            reports.data.map(report => (
                              <tr key={ report.id }>
                                <td className="border-b-2 px-4 py-3 bg-white">
                                  <Link as="button" href={route('member.dailyreports.show', {date: report.date})} className="w-full text-white bg-sky-500 border-0 py-2 px-4 hover:bg-sky-600 rounded">詳細</Link>
                                </td>
                                <td className="border-b-2 px-4 py-3 bg-white">{report.date}</td>
                                <td className="border-b-2 px-4 py-3 bg-white">
                                  {report.submitted_at ? '提出済み' : '作成中'}
                                </td>
                              </tr>
                            )) :
                            <tr>
                              <td className="border-b-2 px-4 py-3 bg-white"></td>
                              <td className="border-b-2 px-4 py-3 bg-white">日報がありません</td>
                              <td className="border-b-2 px-4 py-3 bg-white"></td>
                            </tr>
                            }
                        </tbody>
                      </table>
                    </StyledMemberDailyReportTableContainer>
                  </div>
                  <div className="flex justify-center items-center mt-4">
                    <Pagination links={reports.links} />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}

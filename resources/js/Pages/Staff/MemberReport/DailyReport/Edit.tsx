import AuthenticatedLayout from '@/Layouts/StaffAuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Fragment, FormEventHandler } from 'react'
import { DailyReportStartWorkType, DailyReportEndWorkType, DailyReportScoreOption } from '@/types'
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextArea from '@/Components/TextArea';

type EditProps = {
  member: {
    id: number;
    name: string;
  };
  report: {
    id: number;
    memberId: number;
    date: string;
    startWorkType: number;
    endWorkType: number;
    attendanceMemo: string | null;
    firstPeriod: string;
    secondPeriod: string;
    thirdPeriod: string;
    fourthPeriod: string;
    fifthPeriod: string | null;
    comment: string;
    nextSchedule: string;
    mentalConditionScore: number;
    physicalConditionScore: number;
    submittedAt: string;
    staffName: string | null;
    staffMemo: string | null;
  };
  startWorkType: DailyReportStartWorkType;
  endWorkType: DailyReportEndWorkType;
  scoreOption: DailyReportScoreOption;
};

export default function Edit({member, report, startWorkType, endWorkType, scoreOption}: EditProps) {
  const { data, setData, put, errors } = useForm({
    staffMemo: report.staffMemo ? report.staffMemo : '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    put(route('staff.memberDailyReports.update', {member: member.id, date: report.date}));
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          {member.name} さんの日報編集 {report.date} 分
        </h2>
      }
    >
      <Head title={`${member.name} さんの日報編集`} />

      <div className="PageContainer">
        <div className="PageWrapper">
          <div className="Page">
            <div className="PageContent">
              <section className="text-gray-600 body-font relative">
                <div className="container mx-auto">
                  <div className="lg:w-1/2 md:w-2/3 mx-auto">
                    <div className="flex flex-col">
                      <h3 className="text-xl font-semibold leading-tight text-gray-800">
                        出勤退勤について
                      </h3>
                      <div className="p-2 w-full">
                        <div className="relative">
                          <p className="block text-sm font-medium text-gray-700 leading-7">日付</p>

                          <p className="rounded-md border-gray-300 shadow-sm mt-1 block w-full bg-gray-100 bg-opacity-50 border text-base text-gray-700 py-1 px-3 leading-8">{report.date}</p>
                        </div>
                      </div>
                      <div className="p-2 w-full">
                        <div className="relative">
                          <p className="block text-sm font-medium text-gray-700 leading-7">朝礼（10:00）</p>

                          <p className="rounded-md border-gray-300 shadow-sm mt-1 block w-full bg-gray-100 bg-opacity-50 border text-base text-gray-700 py-1 px-3 leading-8">{Object.values(startWorkType).find(option => option.value === String(report.startWorkType))?.label}</p>
                        </div>
                      </div>
                      <div className="p-2 w-full">
                        <div className="relative">
                          <p className="block text-sm font-medium text-gray-700 leading-7">終礼（15:20）</p>

                          <p className="rounded-md border-gray-300 shadow-sm mt-1 block w-full bg-gray-100 bg-opacity-50 border text-base text-gray-700 py-1 px-3 leading-8">{Object.values(endWorkType).find(option => option.value === String(report.endWorkType))?.label}</p>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold leading-tight text-gray-800">
                          業務について
                      </h3>
                      <div className="p-2 w-full">
                        <div className="relative">
                          <p className="block text-sm font-medium text-gray-700 leading-7">遅刻・早退や当日に記入忘れした場合はこちらに記入</p>

                          <p className="rounded-md border-gray-300 shadow-sm mt-1 block w-full bg-gray-100 bg-opacity-50 border text-base text-gray-700 py-2 px-3 leading-6">
                            {report.attendanceMemo
                              ? report.attendanceMemo.split(/\r\n|\r|\n/).map((line, index, array) => (
                                <Fragment key={index}>
                                  {line}
                                  {index !== array.length - 1 && <br />}
                                </Fragment>
                              ))
                              : '未入力'
                            }
                          </p>
                        </div>
                      </div>
                      <div className="p-2 w-full">
                        <div className="relative">
                          <p className="block text-sm font-medium text-gray-700 leading-7">1時限目の作業（10:00～11:00）60分</p>

                          <p className="rounded-md border-gray-300 shadow-sm mt-1 block w-full bg-gray-100 bg-opacity-50 border text-base text-gray-700 py-2 px-3 leading-6">
                            {report.firstPeriod.split(/\r\n|\r|\n/).map((line, index, array) => (
                                <Fragment key={index}>
                                  {line}
                                  {index !== array.length - 1 && <br />}
                                </Fragment>
                              ))
                            }
                          </p>
                        </div>
                      </div>
                      <div className="p-2 w-full">
                        <div className="relative">
                          <p className="block text-sm font-medium text-gray-700 leading-7">2時限目の作業（11:15～12:00）45分</p>

                          <p className="rounded-md border-gray-300 shadow-sm mt-1 block w-full bg-gray-100 bg-opacity-50 border text-base text-gray-700 py-2 px-3 leading-6">
                            {report.secondPeriod.split(/\r\n|\r|\n/).map((line, index, array) => (
                                <Fragment key={index}>
                                  {line}
                                  {index !== array.length - 1 && <br />}
                                </Fragment>
                              ))
                            }
                          </p>
                        </div>
                      </div>
                      <div className="p-2 w-full">
                        <div className="relative">
                          <p className="block text-sm font-medium text-gray-700 leading-7">3時限目の作業（13:00～14:00）60分</p>

                          <p className="rounded-md border-gray-300 shadow-sm mt-1 block w-full bg-gray-100 bg-opacity-50 border text-base text-gray-700 py-2 px-3 leading-6">
                            {report.thirdPeriod.split(/\r\n|\r|\n/).map((line, index, array) => (
                                <Fragment key={index}>
                                  {line}
                                  {index !== array.length - 1 && <br />}
                                </Fragment>
                              ))
                            }
                          </p>
                        </div>
                      </div>
                      <div className="p-2 w-full">
                        <div className="relative">
                          <p className="block text-sm font-medium text-gray-700 leading-7">4時限目の作業（14:15～15:30）75分</p>

                          <p className="rounded-md border-gray-300 shadow-sm mt-1 block w-full bg-gray-100 bg-opacity-50 border text-base text-gray-700 py-2 px-3 leading-6">
                            {report.fourthPeriod.split(/\r\n|\r|\n/).map((line, index, array) => (
                                <Fragment key={index}>
                                  {line}
                                  {index !== array.length - 1 && <br />}
                                </Fragment>
                              ))
                            }
                          </p>
                        </div>
                      </div>
                      <div className="p-2 w-full">
                        <div className="relative">
                          <p className="block text-sm font-medium text-gray-700 leading-7">5時限目の作業（11:15～12:00）45分</p>

                          <p className="rounded-md border-gray-300 shadow-sm mt-1 block w-full bg-gray-100 bg-opacity-50 border text-base text-gray-700 py-2 px-3 leading-6">
                            {report.fifthPeriod
                              ? report.fifthPeriod.split(/\r\n|\r|\n/).map((line, index, array) => (
                                <Fragment key={index}>
                                  {line}
                                  {index !== array.length - 1 && <br />}
                                </Fragment>
                              ))
                              : '未入力'
                            }
                          </p>
                        </div>
                      </div>
                      <div className="p-2 w-full">
                        <div className="relative">
                          <p className="block text-sm font-medium text-gray-700 leading-7">今日の感想（良かったこと・困ったこと・不明点など）</p>

                          <p className="rounded-md border-gray-300 shadow-sm mt-1 block w-full bg-gray-100 bg-opacity-50 border text-base text-gray-700 py-2 px-3 leading-6">
                            {report.comment.split(/\r\n|\r|\n/).map((line, index, array) => (
                                <Fragment key={index}>
                                  {line}
                                  {index !== array.length - 1 && <br />}
                                </Fragment>
                              ))
                            }
                          </p>
                        </div>
                      </div>
                      <div className="p-2 w-full">
                        <div className="relative">
                          <p className="block text-sm font-medium text-gray-700 leading-7">次回出勤時に取り組むこと</p>

                          <p className="rounded-md border-gray-300 shadow-sm mt-1 block w-full bg-gray-100 bg-opacity-50 border text-base text-gray-700 py-2 px-3 leading-6">
                            {report.nextSchedule.split(/\r\n|\r|\n/).map((line, index, array) => (
                                <Fragment key={index}>
                                  {line}
                                  {index !== array.length - 1 && <br />}
                                </Fragment>
                              ))
                            }
                          </p>
                        </div>
                      </div>
                      <div className="p-2 w-full">
                        <div className="relative">
                          <p className="block text-sm font-medium text-gray-700 leading-7">心の調子</p>

                          <p className="rounded-md border-gray-300 shadow-sm mt-1 block w-full bg-gray-100 bg-opacity-50 border text-base text-gray-700 py-1 px-3 leading-8">{Object.values(scoreOption).find(option => option.value === String(report.mentalConditionScore))?.label}</p>
                        </div>
                      </div>
                      <div className="p-2 w-full">
                        <div className="relative">
                          <p className="block text-sm font-medium text-gray-700 leading-7">体の調子</p>

                          <p className="rounded-md border-gray-300 shadow-sm mt-1 block w-full bg-gray-100 bg-opacity-50 border text-base text-gray-700 py-1 px-3 leading-8">{Object.values(scoreOption).find(option => option.value === String(report.physicalConditionScore))?.label}</p>
                        </div>
                      </div>
                      <div className="p-2 w-full">
                        <div className="relative">
                          <p className="block text-sm font-medium text-gray-700 leading-7">提出日時</p>

                          <p className="rounded-md border-gray-300 shadow-sm mt-1 block w-full bg-gray-100 bg-opacity-50 border text-base text-gray-700 py-1 px-3 leading-8">{report.submittedAt}</p>
                        </div>
                      </div>
                      <div className="p-2 w-full">
                        <div className="relative">
                          <p className="block text-sm font-medium text-gray-700 leading-7">スタッフメモ最終更新者</p>

                          <p className="rounded-md border-gray-300 shadow-sm mt-1 block w-full bg-gray-100 bg-opacity-50 border text-base text-gray-700 py-1 px-3 leading-8">{report.staffName ? report.staffName : ''}</p>
                        </div>
                      </div>
                      <form onSubmit={submit}>
                        <div className="p-2 w-full">
                          <div className="relative">
                            <InputLabel htmlFor="staffMemo" className="leading-7 text-sm text-gray-600">
                              スタッフメモ
                            </InputLabel>
                  
                            <TextArea
                              id="staffMemo"
                              name="staffMemo"
                              value={data.staffMemo}
                              className="resize-none mt-1 block w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-3 px-3 leading-4 transition-colors duration-200 ease-in-out"
                              onChange={(e) => setData('staffMemo', e.target.value)}
                              placeholder="メモを入力"
                              rows={1}
                            />
                  
                            <InputError message={errors.staffMemo} className="mt-2" />
                          </div>
                        </div>
                        <div className="p-2 w-full flex gap-4 justify-center">
                          <Link as="button" href={route('staff.memberDailyReports.show', {member: member.id, date: report.date})} className="text-white bg-gray-500 border-0 py-2 px-8 hover:bg-gray-600 rounded">詳細に戻る</Link>
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
  )
}

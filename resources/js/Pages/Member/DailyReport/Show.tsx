import AuthenticatedLayout from '@/Layouts/MemberAuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import FlashMessage from '@/Components/FlashMessage';
import { Fragment } from 'react'
import { DailyReportStartWorkType, DailyReportEndWorkType, DailyReportScoreOption } from '@/types'

type ShowProps = {
    flash: {
        status: string | null;
        message: string | null;
    };
    report: {
        id: number;
        memberId: number;
        date: string;
        startWorkType: number | null;
        endWorkType: number | null;
        attendanceMemo: string | null;
        firstPeriod: string | null;
        secondPeriod: string | null;
        thirdPeriod: string | null;
        fourthPeriod: string | null;
        fifthPeriod: string | null;
        comment: string | null;
        nextSchedule: string | null;
        mentalConditionScore: number | null;
        physicalConditionScore: number | null;
        submittedAt: string | null;
    };
    startWorkType: DailyReportStartWorkType;
    endWorkType: DailyReportEndWorkType;
    scoreOption: DailyReportScoreOption;
};

export default function Show({flash, report, startWorkType, endWorkType, scoreOption}: ShowProps) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    日報詳細 {report.date} 分
                </h2>
            }
        >
            <Head title="日報詳細" />

            <FlashMessage flash={flash} />
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

                                                    <p className="rounded-md border-gray-300 shadow-sm mt-1 block w-full bg-gray-100 bg-opacity-50 border text-base text-gray-700 py-1 px-3 leading-8">{report.startWorkType ? Object.values(startWorkType).find(option => option.value === String(report.startWorkType))?.label : '未入力'}</p>
                                                </div>
                                            </div>
                                            <div className="p-2 w-full">
                                                <div className="relative">
                                                    <p className="block text-sm font-medium text-gray-700 leading-7">終礼（15:20）</p>

                                                    <p className="rounded-md border-gray-300 shadow-sm mt-1 block w-full bg-gray-100 bg-opacity-50 border text-base text-gray-700 py-1 px-3 leading-8">{report.endWorkType ? Object.values(endWorkType).find(option => option.value === String(report.endWorkType))?.label : '未入力'}</p>
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
                                                        {report.firstPeriod
                                                            ? report.firstPeriod.split(/\r\n|\r|\n/).map((line, index, array) => (
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
                                                    <p className="block text-sm font-medium text-gray-700 leading-7">2時限目の作業（11:15～12:00）45分</p>

                                                    <p className="rounded-md border-gray-300 shadow-sm mt-1 block w-full bg-gray-100 bg-opacity-50 border text-base text-gray-700 py-2 px-3 leading-6">
                                                        {report.secondPeriod
                                                            ? report.secondPeriod.split(/\r\n|\r|\n/).map((line, index, array) => (
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
                                                    <p className="block text-sm font-medium text-gray-700 leading-7">3時限目の作業（13:00～14:00）60分</p>

                                                    <p className="rounded-md border-gray-300 shadow-sm mt-1 block w-full bg-gray-100 bg-opacity-50 border text-base text-gray-700 py-2 px-3 leading-6">
                                                        {report.thirdPeriod
                                                            ? report.thirdPeriod.split(/\r\n|\r|\n/).map((line, index, array) => (
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
                                                    <p className="block text-sm font-medium text-gray-700 leading-7">4時限目の作業（14:15～15:30）75分</p>

                                                    <p className="rounded-md border-gray-300 shadow-sm mt-1 block w-full bg-gray-100 bg-opacity-50 border text-base text-gray-700 py-2 px-3 leading-6">
                                                        {report.fourthPeriod
                                                            ? report.fourthPeriod.split(/\r\n|\r|\n/).map((line, index, array) => (
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
                                                        {report.comment
                                                            ? report.comment.split(/\r\n|\r|\n/).map((line, index, array) => (
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
                                                    <p className="block text-sm font-medium text-gray-700 leading-7">次回出勤時に取り組むこと</p>

                                                    <p className="rounded-md border-gray-300 shadow-sm mt-1 block w-full bg-gray-100 bg-opacity-50 border text-base text-gray-700 py-2 px-3 leading-6">
                                                        {report.nextSchedule
                                                            ? report.nextSchedule.split(/\r\n|\r|\n/).map((line, index, array) => (
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
                                                    <p className="block text-sm font-medium text-gray-700 leading-7">心の調子</p>

                                                    <p className="rounded-md border-gray-300 shadow-sm mt-1 block w-full bg-gray-100 bg-opacity-50 border text-base text-gray-700 py-1 px-3 leading-8">{report.mentalConditionScore ? Object.values(scoreOption).find(option => option.value === String(report.mentalConditionScore))?.label : '未入力'}</p>
                                                </div>
                                            </div>
                                            <div className="p-2 w-full">
                                                <div className="relative">
                                                    <p className="block text-sm font-medium text-gray-700 leading-7">体の調子</p>

                                                    <p className="rounded-md border-gray-300 shadow-sm mt-1 block w-full bg-gray-100 bg-opacity-50 border text-base text-gray-700 py-1 px-3 leading-8">{report.physicalConditionScore ? Object.values(scoreOption).find(option => option.value === String(report.physicalConditionScore))?.label : '未入力'}</p>
                                                </div>
                                            </div>
                                            <div className="p-2 w-full">
                                                <div className="relative">
                                                    <p className="block text-sm font-medium text-gray-700 leading-7">ステータス</p>

                                                    <p className="rounded-md border-gray-300 shadow-sm mt-1 block w-full bg-gray-100 bg-opacity-50 border text-base text-gray-700 py-1 px-3 leading-8">{report.submittedAt ? '提出済み' : '作成中'}</p>
                                                </div>
                                            </div>
                                            <div className="p-2 w-full flex gap-4 justify-center">
                                                <Link as="button" href={route('member.dailyReports.index')} className="text-white bg-gray-500 border-0 py-2 px-8 hover:bg-gray-600 rounded">一覧に戻る</Link>
                                                <Link as="button" href={route('member.dailyReports.edit', {date: report.date})} className="text-white bg-indigo-500 border-0 py-2 px-8 hover:bg-indigo-600 rounded">編集する</Link>
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
    )
}

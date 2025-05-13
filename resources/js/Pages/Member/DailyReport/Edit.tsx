import AuthenticatedLayout from '@/Layouts/MemberAuthenticatedLayout';
import RepeatStep1 from './RepeatStep1';
import RepeatStep2 from './RepeatStep2';
import { Head, useForm } from '@inertiajs/react';
import { useState, FormEventHandler } from 'react';
import Modal from '@/Components/Modal';
import { DailyReportStartWorkType, DailyReportEndWorkType, DailyReportScoreOption } from '@/types'

type EditProps = {
    report: {
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
    };
    startWorkType: DailyReportStartWorkType;
    endWorkType: DailyReportEndWorkType;
    scoreOption: DailyReportScoreOption;
};

type FormDataType = {
    startWorkType: string;
    endWorkType: string;
    attendanceMemo: string;
    firstPeriod: string;
    secondPeriod: string;
    thirdPeriod: string;
    fourthPeriod: string;
    fifthPeriod: string;
    comment: string;
    nextSchedule: string;
    mentalConditionScore: string;
    physicalConditionScore: string;
};

export default function Edit({report, startWorkType, endWorkType, scoreOption}: EditProps) {
    const totalSteps = 2;
    const [step, setStep] = useState(1);
    
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);

    const { data, setData, post, put, delete: destroy, errors } = useForm({
        startWorkType: report.startWorkType ? String(report.startWorkType) : '',
        endWorkType: report.endWorkType ? String(report.endWorkType) : '',
        attendanceMemo: report.attendanceMemo ? report.attendanceMemo : '',
        firstPeriod: report.firstPeriod ? report.firstPeriod : '',
        secondPeriod: report.secondPeriod ? report.secondPeriod : '',
        thirdPeriod: report.thirdPeriod ? report.thirdPeriod : '',
        fourthPeriod: report.fourthPeriod ? report.fourthPeriod : '',
        fifthPeriod: report.fifthPeriod ? report.fifthPeriod : '',
        comment: report.comment ? report.comment : '',
        nextSchedule: report.nextSchedule ? report.nextSchedule : '',
        mentalConditionScore: report.mentalConditionScore ? String(report.mentalConditionScore) : '',
        physicalConditionScore: report.physicalConditionScore ? String(report.physicalConditionScore) : '',
    });

    const handleSave = () => {
        put(route('member.dailyReports.repeatSave', {date: report.date}), {
            onError: (errors: Partial<Record<keyof FormDataType, string>>) => {
                if (errors.startWorkType || errors.endWorkType ) {
                    setStep(1);
                } else {
                    setStep(2);
                }
            },
        });
    };

    const handleSubmit = () => {
        put(route('member.dailyReports.repeatSubmit', {date: report.date}), {
            onError: (errors: Partial<Record<keyof FormDataType, string>>) => {
                if (errors.startWorkType || errors.endWorkType ) {
                    setStep(1);
                } else {
                    setStep(2);
                }
            },
        });
    };

    const nextStep = () => {
        post(route('member.dailyReports.repeatValidateStep', {date: report.date, step: step}), {
            onSuccess: () => {
                setStep((prev) => Math.min(prev + 1, totalSteps));
            },
        });
    };

    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    const confirmDeletion = () => {
        setConfirmingDeletion(true);
    };

    const deleteItem: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('member.dailyReports.destroy', {date: report.date}), {
            onFinish: () => closeModal(),
        });
    };

    const closeModal = () => {
        setConfirmingDeletion(false);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    日報編集 {report.date} 分
                </h2>
            }
        >
            <Head title="日報編集" />

            <div className="PageContainer">
                <div className="PageWrapper">
                    <div className="Page">
                        <div className="PageContent">
                            <section className="text-gray-600 body-font relative">
                                <div className="container mx-auto">
                                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                                        <div className="flex flex-col">
                                            <form>
                                                {step === 1 && (
                                                    <RepeatStep1
                                                        date={report.date}
                                                        data={data}
                                                        setData={setData}
                                                        errors={errors}
                                                        nextStep={nextStep}
                                                        handleSave={handleSave}
                                                        confirmDeletion={confirmDeletion}
                                                        startWorkType={startWorkType}
                                                        endWorkType={endWorkType}
                                                    />
                                                )}
                                                {step === 2 && (
                                                    <RepeatStep2
                                                        date={report.date}
                                                        data={data}
                                                        setData={setData}
                                                        errors={errors}
                                                        prevStep={prevStep}
                                                        handleSave={handleSave}
                                                        confirmDeletion={confirmDeletion}
                                                        handleSubmit={handleSubmit}
                                                        scoreOption={scoreOption}
                                                    />
                                                )}
                                            </form>
                                            <Modal show={confirmingDeletion} onClose={closeModal}>
                                                <form onSubmit={deleteItem} className="p-6">
                                                    <h2 className="text-lg font-medium text-gray-900">
                                                        本当に削除しますか？
                                                    </h2>
                                
                                                    <p className="mt-1 text-sm text-gray-600">
                                                        削除後データを復元することはできません。
                                                    </p>
                                
                                                    <div className="mt-4 w-full flex gap-4 justify-center">
                                                        <button type="button" onClick={closeModal} className="text-white bg-gray-500 border-0 py-2 px-8 hover:bg-gray-600 rounded">
                                                            キャンセル
                                                        </button>
                                
                                                        <button className="text-white bg-red-500 border-0 py-2 px-8 hover:bg-red-600 rounded">
                                                            削除する
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
    )
}

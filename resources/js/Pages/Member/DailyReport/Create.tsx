import AuthenticatedLayout from '@/Layouts/MemberAuthenticatedLayout';
import Step1 from './Step1';
import Step2 from './Step2';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { DailyReportStartWorkType, DailyReportEndWorkType, DailyReportScoreOption } from '@/types'

type CreateProps = {
    startWorkType: DailyReportStartWorkType;
    endWorkType: DailyReportEndWorkType;
    scoreOption: DailyReportScoreOption;
};

type FormDataType = {
    date: string;
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

export default function Create({startWorkType, endWorkType, scoreOption}: CreateProps) {
    const totalSteps = 2;
    const [step, setStep] = useState(1);
    
    const { data, setData, post, errors } = useForm({
        date: new Date().toLocaleDateString('ja-JP', {year: 'numeric', month: '2-digit', day: '2-digit'}).replaceAll('/', '-'),
        startWorkType: '',
        endWorkType: '',
        attendanceMemo: '',
        firstPeriod: '',
        secondPeriod: '',
        thirdPeriod: '',
        fourthPeriod: '',
        fifthPeriod: '',
        comment: '',
        nextSchedule: '',
        mentalConditionScore: '',
        physicalConditionScore: '',
    });

    const handleSave = () => {
        post(route('member.dailyReports.initialSave'), {
            onError: (errors: Partial<Record<keyof FormDataType, string>>) => {
                if (errors.date || errors.startWorkType || errors.endWorkType ) {
                    setStep(1);
                } else {
                    setStep(2);
                }
            },
        });
    };

    const handleSubmit = () => {
        post(route('member.dailyReports.initialSubmit'), {
            onError: (errors: Partial<Record<keyof FormDataType, string>>) => {
                if (errors.date || errors.startWorkType || errors.endWorkType ) {
                    setStep(1);
                } else {
                    setStep(2);
                }
            },
        });
    };

    const nextStep = () => {
        post(route('member.dailyReports.validateStep', {step: step}), {
            onSuccess: () => {
                setStep((prev) => Math.min(prev + 1, totalSteps));
            },
        });
    };

    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    日報新規作成
                </h2>
            }
        >
            <Head title="日報新規作成" />

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
                                                    <Step1
                                                        data={data}
                                                        setData={setData}
                                                        errors={errors}
                                                        nextStep={nextStep}
                                                        handleSave={handleSave}
                                                        startWorkType={startWorkType}
                                                        endWorkType={endWorkType}
                                                    />
                                                )}
                                                {step === 2 && (
                                                    <Step2
                                                        data={data}
                                                        setData={setData}
                                                        errors={errors}
                                                        prevStep={prevStep}
                                                        handleSave={handleSave}
                                                        handleSubmit={handleSubmit}
                                                        scoreOption={scoreOption}
                                                    />
                                                )}
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

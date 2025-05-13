import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { DailyReportStartWorkType, DailyReportEndWorkType } from '@/types'
import styled from 'styled-components'
import { Link } from '@inertiajs/react';

type Step1Props = {
  data: {
    date: string;
    startWorkType: string;
    endWorkType: string;
  };
  setData: (field: keyof Step1Props['data'], value: string) => void;
  errors: Partial<Record<keyof Step1Props['data'], string>>;
  nextStep: () => void;
  handleSave: () => void;
  startWorkType: DailyReportStartWorkType;
  endWorkType: DailyReportEndWorkType;
};

const StyledDailyReportWorkType = styled.div`
  width: 100%;
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

export default function Step1({data, setData, errors, nextStep, handleSave, startWorkType, endWorkType}: Step1Props) {
  return (
    <>
      <div className="text-lg font-semibold leading-tight text-gray-800">出勤退勤について</div>
      <div className="p-2 w-full">
        <div className="relative">
          <InputLabel htmlFor="date" className="leading-7 text-sm text-gray-600">
            日付 <span className="text-red-600">*必須項目</span>
          </InputLabel>

          <TextInput
            id="date"
            type="date"
            name="date"
            value={data.date}
            className="mt-1 block w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            onChange={(e) => setData('date', e.target.value)}
            required
          />

          <InputError message={errors.date} className="mt-2" />
        </div>
      </div>
      <div className="p-2 w-full">
        <div className="relative">
          <p className="block text-sm font-medium text-gray-700 leading-7">朝礼（10:00） <span className="text-red-600">*必須項目</span></p>
          <div className="flex flex-col gap-1 mt-1">
            {Object.entries(startWorkType).map(([key, option]) => (
              <StyledDailyReportWorkType key={key} className={data.startWorkType === String(option.value) ? 'IsChecked' : ''}>
                <div className="flex items-center">
                  <input
                    id={key}
                    type="radio"
                    name="startWorkType"
                    value={String(option.value)}
                    checked={data.startWorkType === String(option.value)}
                    onChange={(e) => setData('startWorkType', e.target.value)}
                  />
                  <InputLabel htmlFor={key} value={option.label} className={`flex-auto pl-2 py-1 leading-7 text-sm text-gray-600 select-none ${data.startWorkType === String(option.value) ? 'text-white' : ''}`}/>
                </div>
              </StyledDailyReportWorkType>
            ))}
          </div>
          <InputError message={errors.startWorkType} className="mt-2" />
        </div>
      </div>
      <div className="p-2 w-full">
        <div className="relative">
          <p className="block text-sm font-medium text-gray-700 leading-7">終礼（15:20） <span className="text-red-600">*必須項目</span></p>
          <div className="flex flex-col gap-1 mt-1">
            {Object.entries(endWorkType).map(([key, option]) => (
              <StyledDailyReportWorkType key={key} className={data.endWorkType === String(option.value) ? 'IsChecked' : ''}>
                <div className="flex items-center">
                  <input
                    id={key}
                    type="radio"
                    name="endWorkType"
                    value={String(option.value)}
                    checked={data.endWorkType === String(option.value)}
                    onChange={(e) => setData('endWorkType', e.target.value)}
                  />
                  <InputLabel htmlFor={key} value={option.label} className={`flex-auto pl-2 py-1 leading-7 text-sm text-gray-600 select-none ${data.endWorkType === String(option.value) ? 'text-white' : ''}`}/>
                </div>
              </StyledDailyReportWorkType>
            ))}
          </div>
          <InputError message={errors.endWorkType} className="mt-2" />
        </div>
      </div>
      <div className="p-2 w-full flex gap-4 justify-center">
        <button type="button" onClick={() => handleSave()} className="text-white bg-indigo-500 border-0 py-2 px-8 hover:bg-indigo-600 rounded">一時保存する</button>
        <button type="button" onClick={() => nextStep()} className="text-white bg-indigo-500 border-0 py-2 px-8 hover:bg-indigo-600 rounded">次のページへ</button>
      </div>
      <div className="p-2 w-full flex gap-4 justify-center">
        <Link as="button" href={route('member.dailyReports.index')} className="text-white bg-gray-500 border-0 py-2 px-8 hover:bg-gray-600 rounded">一覧に戻る</Link>
      </div>
    </>
  )
}

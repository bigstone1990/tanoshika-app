import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectBox from '@/Components/SelectBox'
import TextArea from '@/Components/TextArea';
import { Link } from '@inertiajs/react';
import { DailyReportScoreOption } from '@/types'

type RepeatStep2Props = {
  date: string;
  data: {
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
  setData: (field: keyof RepeatStep2Props['data'], value: string) => void;
  errors: Partial<Record<keyof RepeatStep2Props['data'], string>>;
  prevStep: () => void;
  handleSave: () => void;
  handleSubmit: () => void;
  confirmDeletion: () => void;
  scoreOption: DailyReportScoreOption;
};

export default function RepeatStep2({date, data, setData, errors, prevStep, handleSave, handleSubmit, confirmDeletion, scoreOption}: RepeatStep2Props) {
  return (
    <>
      <div className="text-lg font-semibold leading-tight text-gray-800">業務について</div>
      <div className="p-2 w-full">
        <div className="relative">
          <InputLabel htmlFor="attendanceMemo" className="leading-7 text-sm text-gray-600">
            遅刻・早退や当日に記入忘れした場合はこちらに記入
          </InputLabel>
          <p className="flex items-center gap-4 text-sm text-gray-600"><span>例）遅刻 10:15出勤</span><span>早退 14:09退勤</span><span>残業 16:45退勤</span></p>

          <TextArea
            id="attendanceMemo"
            name="attendanceMemo"
            value={data.attendanceMemo}
            className="resize-none mt-1 block w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-3 px-3 leading-4 transition-colors duration-200 ease-in-out"
            onChange={(e) => setData('attendanceMemo', e.target.value)}
            placeholder="回答を入力"
            rows={1}
          />

          <InputError message={errors.attendanceMemo} className="mt-2" />
        </div>
      </div>
      <div className="p-2 w-full">
        <div className="relative">
          <InputLabel htmlFor="firstPeriod" className="leading-7 text-sm text-gray-600">
            1時限目の作業（10:00～11:00）60分 <span className="text-red-600">*必須項目</span>
          </InputLabel>
          <p className="text-sm text-gray-600">遅刻・早退についてはその旨記入してください</p>

          <TextArea
            id="firstPeriod"
            name="firstPeriod"
            value={data.firstPeriod}
            className="resize-none mt-1 block w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-3 px-3 leading-4 transition-colors duration-200 ease-in-out"
            onChange={(e) => setData('firstPeriod', e.target.value)}
            placeholder="回答を入力"
            rows={1}
          />

          <InputError message={errors.firstPeriod} className="mt-2" />
        </div>
      </div>
      <div className="p-2 w-full">
        <div className="relative">
          <InputLabel htmlFor="secondPeriod" className="leading-7 text-sm text-gray-600">
            2時限目の作業（11:15～12:00）45分 <span className="text-red-600">*必須項目</span>
          </InputLabel>
          <p className="text-sm text-gray-600">遅刻・早退についてはその旨記入してください</p>

          <TextArea
            id="secondPeriod"
            name="secondPeriod"
            value={data.secondPeriod}
            className="resize-none mt-1 block w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-3 px-3 leading-4 transition-colors duration-200 ease-in-out"
            onChange={(e) => setData('secondPeriod', e.target.value)}
            placeholder="回答を入力"
            rows={1}
          />

          <InputError message={errors.secondPeriod} className="mt-2" />
        </div>
      </div>
      <div className="p-2 w-full">
        <div className="relative">
          <InputLabel htmlFor="thirdPeriod" className="leading-7 text-sm text-gray-600">
            3時限目の作業（13:00～14:00）60分 <span className="text-red-600">*必須項目</span>
          </InputLabel>
          <p className="text-sm text-gray-600">遅刻・早退についてはその旨記入してください</p>

          <TextArea
            id="thirdPeriod"
            name="thirdPeriod"
            value={data.thirdPeriod}
            className="resize-none mt-1 block w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-3 px-3 leading-4 transition-colors duration-200 ease-in-out"
            onChange={(e) => setData('thirdPeriod', e.target.value)}
            placeholder="回答を入力"
            rows={1}
          />

          <InputError message={errors.thirdPeriod} className="mt-2" />
        </div>
      </div>
      <div className="p-2 w-full">
        <div className="relative">
          <InputLabel htmlFor="fourthPeriod" className="leading-7 text-sm text-gray-600">
            4時限目の作業（14:15～15:30）75分 <span className="text-red-600">*必須項目</span>
          </InputLabel>
          <p className="text-sm text-gray-600">遅刻・早退についてはその旨記入してください</p>

          <TextArea
            id="fourthPeriod"
            name="fourthPeriod"
            value={data.fourthPeriod}
            className="resize-none mt-1 block w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-3 px-3 leading-4 transition-colors duration-200 ease-in-out"
            onChange={(e) => setData('fourthPeriod', e.target.value)}
            placeholder="回答を入力"
            rows={1}
          />

          <InputError message={errors.fourthPeriod} className="mt-2" />
        </div>
      </div>
      <div className="p-2 w-full">
        <div className="relative">
          <InputLabel htmlFor="fifthPeriod" className="leading-7 text-sm text-gray-600">
            5時限目の作業（11:15～12:00）45分
          </InputLabel>
          <p className="text-sm text-gray-600">勤務した方のみ記入してください</p>

          <TextArea
            id="fifthPeriod"
            name="fifthPeriod"
            value={data.fifthPeriod}
            className="resize-none mt-1 block w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-3 px-3 leading-4 transition-colors duration-200 ease-in-out"
            onChange={(e) => setData('fifthPeriod', e.target.value)}
            placeholder="回答を入力"
            rows={1}
          />

          <InputError message={errors.fifthPeriod} className="mt-2" />
        </div>
      </div>
      <div className="p-2 w-full">
        <div className="relative">
          <InputLabel htmlFor="comment" className="leading-7 text-sm text-gray-600">
            今日の感想（良かったこと・困ったこと・不明点など） <span className="text-red-600">*必須項目</span>
          </InputLabel>
          <p className="text-sm text-gray-600">勤務した方のみ記入してください</p>

          <TextArea
            id="comment"
            name="comment"
            value={data.comment}
            className="resize-none mt-1 block w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-3 px-3 leading-4 transition-colors duration-200 ease-in-out"
            onChange={(e) => setData('comment', e.target.value)}
            placeholder="回答を入力"
            rows={1}
          />

          <InputError message={errors.comment} className="mt-2" />
        </div>
      </div>
      <div className="p-2 w-full">
        <div className="relative">
          <InputLabel htmlFor="nextSchedule" className="leading-7 text-sm text-gray-600">
            次回出勤時に取り組むこと <span className="text-red-600">*必須項目</span>
          </InputLabel>

          <TextArea
            id="nextSchedule"
            name="nextSchedule"
            value={data.nextSchedule}
            className="resize-none mt-1 block w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-3 px-3 leading-4 transition-colors duration-200 ease-in-out"
            onChange={(e) => setData('nextSchedule', e.target.value)}
            placeholder="回答を入力"
            rows={1}
          />

          <InputError message={errors.nextSchedule} className="mt-2" />
        </div>
      </div>
      <div className="p-2 w-full">
        <div className="relative">
          <InputLabel htmlFor="mentalConditionScore" className="leading-7 text-sm text-gray-600">
            心の調子 <span className="text-red-600">*必須項目</span>
          </InputLabel>
          <p className="flex items-center gap-4 text-sm text-gray-600"><span>1: 暗い</span><span>10: 明るい</span></p>

          <SelectBox
            id="mentalConditionScore"
            name="mentalConditionScore"
            value={data.mentalConditionScore}
            className="mt-1 block w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            options={Object.values(scoreOption).map((option) => ({
              label: option.label,
              value: option.value
            }))}
            onChange={(e) => setData('mentalConditionScore', e.target.value)}
          />

          <InputError message={errors.mentalConditionScore} className="mt-2" />
        </div>
      </div>
      <div className="p-2 w-full">
        <div className="relative">
          <InputLabel htmlFor="physicalConditionScore" className="leading-7 text-sm text-gray-600">
            体の調子 <span className="text-red-600">*必須項目</span>
          </InputLabel>
          <p className="flex items-center gap-4 text-sm text-gray-600"><span>1: きつい・重い</span><span>10: 元気・軽い</span></p>

          <SelectBox
            id="physicalConditionScore"
            name="physicalConditionScore"
            value={data.physicalConditionScore}
            className="mt-1 block w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            options={Object.values(scoreOption).map((option) => ({
              label: option.label,
              value: option.value
            }))}
            onChange={(e) => setData('physicalConditionScore', e.target.value)}
          />

          <InputError message={errors.physicalConditionScore} className="mt-2" />
        </div>
      </div>
      <div className="p-2 w-full flex gap-4 justify-center">
        <button type="button" onClick={() => prevStep()} className="text-white bg-indigo-500 border-0 py-2 px-8 hover:bg-indigo-600 rounded">前のページへ</button>
        <button type="button" onClick={() => handleSave()} className="text-white bg-indigo-500 border-0 py-2 px-8 hover:bg-indigo-600 rounded">一時保存する</button>
        <button type="button" onClick={() => handleSubmit()} className="text-white bg-indigo-500 border-0 py-2 px-8 hover:bg-indigo-600 rounded">提出する</button>
        <button type="button" onClick={() => confirmDeletion()} className="text-white bg-red-500 border-0 py-2 px-8 hover:bg-red-600 rounded">削除する</button>
      </div>
      <div className="p-2 w-full flex gap-4 justify-center">
        <Link as="button" href={route('member.dailyReports.show', {date: date})} className="text-white bg-gray-500 border-0 py-2 px-8 hover:bg-gray-600 rounded">詳細に戻る</Link>
      </div>
    </>
  )
}

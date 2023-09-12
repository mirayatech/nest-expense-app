import { ReportType, ReportTypeEnum } from './type';

interface Data {
  report: ReportType[];
}

export const data: Data = {
  report: [
    {
      id: 'uuid1',
      source: 'salary',
      amount: 1000,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportTypeEnum.INCOME,
    },
    {
      id: 'uuid2',
      source: 'salary',
      amount: 1000,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportTypeEnum.INCOME,
    },
    {
      id: 'uuid3',
      source: 'salary',
      amount: 1000,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportTypeEnum.EXPENSE,
    },
  ],
};

export enum ReportTypeEnum {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export type ReportType = {
  id: string;
  source: string;
  amount: number;
  created_at: Date;
  updated_at: Date;
  type: ReportTypeEnum;
};

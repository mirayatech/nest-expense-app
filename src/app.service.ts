import { Injectable } from '@nestjs/common';
import { ReportTypeEnum, data } from './data';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AppService {
  getAllReports(type: ReportTypeEnum) {
    return data.report.filter((report) => report.type === type);
  }

  getReportById(type: ReportTypeEnum, id: string) {
    return data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);
  }

  createReport(type: ReportTypeEnum, body: { amount: number; source: string }) {
    const newReport = {
      id: uuid(),
      source: body.source,
      amount: body.amount,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };
    data.report.push(newReport);
    return newReport;
  }

  updateReport(
    type: ReportTypeEnum,
    id: string,
    body: { amount: number; source: string },
  ) {
    const reportToUpdate = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);

    if (!reportToUpdate) return;

    const reportIndex = data.report.findIndex(
      (report) => report.id === reportToUpdate.id,
    );

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
      updated_at: new Date(),
    };

    return data.report[reportIndex];
  }

  deleteReport(id: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id);

    if (reportIndex === -1) return;
    data.report.splice(reportIndex, 1);
  }
}

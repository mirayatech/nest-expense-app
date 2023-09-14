import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Body,
} from '@nestjs/common';
import { data } from './data';
import { ReportTypeEnum } from './type';
import { v4 as uuid } from 'uuid';
@Controller('report/:type')
export class AppController {
  @Get()
  getAllIncomeReports(@Param('type') type: string) {
    const reportType =
      type === 'income' ? ReportTypeEnum.INCOME : ReportTypeEnum.EXPENSE;
    return data.report.filter((report) => report.type === reportType);
  }
  @Get(':id')
  getIncomeReport(@Param('type') type: string, @Param('id') id: string) {
    const reportType =
      type === 'income' ? ReportTypeEnum.INCOME : ReportTypeEnum.EXPENSE;
    return data.report
      .filter((report) => report.type === reportType)
      .find((report) => report.id === id);
  }

  @Post('')
  createIncomeReport(
    @Body() body: { amount: number; source: string },
    @Param('type') type: string,
  ) {
    const newReport = {
      id: uuid(),
      source: body.source,
      amount: body.amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type === 'income' ? ReportTypeEnum.INCOME : ReportTypeEnum.EXPENSE,
    };
    data.report.push(newReport);
    return newReport;
  }

  @Put(':id')
  updateIncomeReport(
    @Param('type') type: string,
    @Param('id') id: string,
    @Body() body: { amount: number; source: string },
  ) {
    const reportType =
      type === 'income' ? ReportTypeEnum.INCOME : ReportTypeEnum.EXPENSE;
    const reportToUpdate = data.report
      .filter((report) => report.type === reportType)
      .find((report) => report.id === id);

    if (!reportToUpdate) return;

    const reportIndex = data.report.findIndex(
      (report) => report.id === reportToUpdate.id,
    );

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
    };

    return data.report[reportIndex];
  }

  @Delete(':id')
  deleteIncomeReport(@Param('id') id: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id);
    if (reportIndex === -1) return;
    data.report.splice(reportIndex, 1);
    return;
  }
}

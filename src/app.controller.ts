import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { data } from './data';
import { ReportTypeEnum } from './type';

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
  createIncomeReport() {
    return 'Created income report';
  }

  @Put(':id')
  updateIncomeReport() {
    return 'Updated income report';
  }

  @Delete(':id')
  deleteIncomeReport() {
    return 'Deleted income report';
  }
}

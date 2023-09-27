import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Body,
  HttpCode,
} from '@nestjs/common';
import { ReportTypeEnum } from './data';
import { AppService } from './app.service';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getAllReports(@Param('type') type: string) {
    const reportType =
      type === 'income' ? ReportTypeEnum.INCOME : ReportTypeEnum.EXPENSE;
    return this.appService.getAllReports(reportType);
  }

  @Get(':id')
  getIncomeReport(@Param('type') type: string, @Param('id') id: string) {
    const reportType =
      type === 'income' ? ReportTypeEnum.INCOME : ReportTypeEnum.EXPENSE;
    return this.appService.getReportById(reportType, id);
  }

  @Post('')
  createIncomeReport(
    @Body() body: { amount: number; source: string },
    @Param('type') type: string,
  ) {
    const reportType =
      type === 'income' ? ReportTypeEnum.INCOME : ReportTypeEnum.EXPENSE;
    return this.appService.cretaeReport(reportType, {
      amount: body.amount,
      source: body.source,
    });
  }

  @Put(':id')
  updateIncomeReport(
    @Param('type') type: string,
    @Param('id') id: string,
    @Body() body: { amount: number; source: string },
  ) {
    const reportType =
      type === 'income' ? ReportTypeEnum.INCOME : ReportTypeEnum.EXPENSE;
    return this.appService.updateReport(reportType, id, {
      amount: body.amount,
      source: body.source,
    });
  }

  @HttpCode(204)
  @Delete(':id')
  deleteIncomeReport(@Param('id') id: string) {
    return this.appService.deleteReport(id);
  }
}

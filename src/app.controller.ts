import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Body,
  HttpCode,
  ParseUUIDPipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { ReportTypeEnum } from './data';
import { AppService } from './app.service';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportTypeEnum)) type: string,
  ) {
    const reportType =
      type === 'income' ? ReportTypeEnum.INCOME : ReportTypeEnum.EXPENSE;
    return this.appService.getAllReports(reportType);
  }

  @Get(':id')
  getIncomeReport(
    @Param('type', new ParseEnumPipe(ReportTypeEnum)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    console.log(id, typeof id);
    const reportType =
      type === 'income' ? ReportTypeEnum.INCOME : ReportTypeEnum.EXPENSE;
    return this.appService.getReportById(reportType, id);
  }

  @Post('')
  createIncomeReport(
    @Body() body: { amount: number; source: string },
    @Param('type', new ParseEnumPipe(ReportTypeEnum)) type: string,
  ) {
    const reportType =
      type === 'income' ? ReportTypeEnum.INCOME : ReportTypeEnum.EXPENSE;
    return this.appService.createReport(reportType, {
      amount: body.amount,
      source: body.source,
    });
  }

  @Put(':id')
  updateIncomeReport(
    @Param('type', new ParseEnumPipe(ReportTypeEnum)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
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
  deleteIncomeReport(@Param('id', ParseUUIDPipe) id: string) {
    return this.appService.deleteReport(id);
  }
}

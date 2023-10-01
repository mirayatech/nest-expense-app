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
import { ReportTypeEnum } from 'src/data';
import {
  ReportResponseDto,
  CreateReportDto,
  UpdateReportDto,
} from 'src/dtos/report.dto';
import { ReportService } from './report.service';

@Controller('report/:type')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}
  @Get()
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportTypeEnum)) type: string,
  ): ReportResponseDto[] {
    const reportType =
      type === 'income' ? ReportTypeEnum.INCOME : ReportTypeEnum.EXPENSE;
    return this.reportService.getAllReports(reportType);
  }

  @Get(':id')
  getIncomeReport(
    @Param('type', new ParseEnumPipe(ReportTypeEnum)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): ReportResponseDto {
    console.log(id, typeof id);
    const reportType =
      type === 'income' ? ReportTypeEnum.INCOME : ReportTypeEnum.EXPENSE;
    return this.reportService.getReportById(reportType, id);
  }

  @Post('')
  createIncomeReport(
    @Body() { amount, source }: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportTypeEnum)) type: string,
  ): ReportResponseDto {
    const reportType =
      type === 'income' ? ReportTypeEnum.INCOME : ReportTypeEnum.EXPENSE;
    return this.reportService.createReport(reportType, {
      amount: amount,
      source: source,
    });
  }

  @Put(':id')
  updateIncomeReport(
    @Param('type', new ParseEnumPipe(ReportTypeEnum)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateReportDto,
  ): ReportResponseDto {
    console.log(body);
    const reportType =
      type === 'income' ? ReportTypeEnum.INCOME : ReportTypeEnum.EXPENSE;
    return this.reportService.updateReport(reportType, id, {
      amount: body.amount,
      source: body.source,
    });
  }

  @HttpCode(204)
  @Delete(':id')
  deleteIncomeReport(@Param('id', ParseUUIDPipe) id: string) {
    return this.reportService.deleteReport(id);
  }
}

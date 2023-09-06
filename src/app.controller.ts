import { Controller, Get } from '@nestjs/common';

@Controller('report/income')
export class AppController {
  @Get('')
  getAllIncomeReports() {
    return [];
  }
  @Get(':id')
  getIncomeReport() {
    return {};
  }
}

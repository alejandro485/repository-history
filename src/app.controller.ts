import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {

    constructor(
        private appService: AppService,
    ) { }

    @Get()
    getRepository() {
        return this.appService.getRepository();
    }

    @Get('branches')
    getBranches() {
        return this.appService.getBranches();
    }
}

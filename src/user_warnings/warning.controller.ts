import { UpdateWarningDTO } from './../dtos/update_warning.dto';
import { CreateWarningDTO } from './../dtos/create_warning.dto';
import { Warning } from './warning.model';
import { Controller, Get, Body, Put, Param, Delete } from '@nestjs/common';
import { WarningService } from './warning.service';
import { Post } from '@nestjs/common/decorators/http/request-mapping.decorator';

@Controller('warnings')
export class WarningController {

    constructor(private readonly warnService:WarningService){

    }

    @Get()
    async all():Promise<Warning[]>{
        return await this.warnService.getAllWarnings();
    }

    @Get('find')
    async findWarnings():Promise<Warning[]>{
        return await this.warnService.ActivateUserAfterYear();
    }


    @Post()
    addOneUser(@Body() warnObj:CreateWarningDTO):Promise<Warning>{
        return this.warnService.addWarning(warnObj);
    }

    @Put(':id')
    editWarning(@Param('id') id:string,@Body() warnObj:UpdateWarningDTO):Promise<Warning>{
        return this.warnService.updateWarning(id, warnObj);
    }


    @Delete(':id')
    async deleteOneUser(@Param('id') id:String){
        return await this.warnService.deleteWarning(id);
    }

    @Get('cin/:cin')
    async findByCIN(@Param('cin') cin:string){
        return await this.warnService.findByCin(cin);
    }

}
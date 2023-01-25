import { IsMongoId } from '@nestjs/class-validator';
import { UserValidationPipesSexe } from './../PipeValidation/user-sexe.pipe';
import { UserValidationPipesProfession } from './../PipeValidation/user-profession.pipe';
import { UserValidationPipes } from './../PipeValidation/user-info-validation.pipe';
import { UsersService } from './user.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes } from '@nestjs/common';
import { CreateUserDTO } from 'src/dtos/create-users.dto';
import { UpdateUserDTO } from 'src/dtos/update-users.dto';
import { User } from './user.model';
import { SendGridService } from '@anchan828/nest-sendgrid';


@Controller('users')
export class UsersController {

    constructor(private readonly userService:UsersService, ){

    }



    @Get('sayHello')
    async sayHello():Promise<any>{
        return await this.userService.send();
    }

    @Get('all')
    async all():Promise<User[]>{
        return await this.userService.users();
    }

    @Get('alreadyIssued')
    async alreadyIssued():Promise<Number>{
        return await this.userService.booksAlreadyIssued();
    }

    @Get('alreadyIssuedCivil')
    async alreadyIssuedCivil():Promise<any>{
        return await this.userService.booksAlreadyIssuedCivilEng();
    }

    @Get('alreadyIssuedInfo')
    async alreadyIssuedInfo():Promise<any>{
        return await this.userService.booksAlreadyIssuedInfoEng();
    }

    @Get('alreadyIssuedID')
    async alreadyIssuedID():Promise<any>{
        return await this.userService.booksAlreadyIssuedIDEng();
    }

    @Get('alreadyIssuedEL')
    async alreadyIssuedEL():Promise<any>{
        return await this.userService.booksAlreadyIssuedEL();
    }

    @Get('alreadyIssuedSM')
    async alreadyIssuedSM():Promise<any>{
        return await this.userService.booksAlreadyIssuedSM();
    }

    @Get('alreadyIssuedFN')
    async alreadyIssuedFN():Promise<any>{
        return await this.userService.booksAlreadyIssuedFN();
    }

    @Get('alreadyIssuedGN')
    async alreadyIssuedGN():Promise<any>{
        return await this.userService.booksAlreadyIssuedGN();
    }

    @Get('getOnlyIfShouldReturn')
    async getWhenShouldReturnBook(){
        return await this.userService.getWhenShouldReturnBook();
    }

    @Get()
    async getAll():Promise<User[]>{
        return await this.userService.getAllUsers();
    }

    @Get('students')
    async getStudents():Promise<User[]>{
        return await this.userService.getStudents();
    }

    @Get('profs')
    async getProfs():Promise<User[]>{
        return await this.userService.getProfesseurs();
    }

    @Get('administratif')
    async getAdministratif():Promise<User[]>{
        return await this.userService.getAdministrative();
    }

    @Get('history')
    async getHistory():Promise<User[]>{
        return await this.userService.getAllHistoryUsers();
    }

    @Get('return')
    TimeToreturnBook():Promise<any>{
        return this.userService.getByShouldReturnedTheBook();
    }

    @Get(':id')
    async getOneUser(@Param('id') idUser:string){
        console.log("Get one");
        return await this.userService.getOneUser(idUser);
    }

    @Get('bookReturned/:id')
    async updateToReturned(@Param('id') idUser:string){
        console.log("Book Returned");
        return await this.userService.bookReturned(idUser);
    }

    @Post()
    addOneUser(@Body() userObj:CreateUserDTO):Promise<User>{
        return this.userService.addOneUser(userObj);
    }

    @Post('exist')
    addOneUserByCIN(@Body() userObj:CreateUserDTO):Promise<User>{
        return this.userService.addUserByCIN(userObj);
    }

    @Put(':id')
    async updateOneUser(@Param('id') id:string, @Body() userObj:UpdateUserDTO):Promise<User>{
        console.log("Update One")
        return await this.userService.updateOneUser(id, userObj);
    }

    @Delete(':id')
    async deleteOneUser(@Param('id') id:String){
        return await this.userService.deleteOneUser(id);
    }
}
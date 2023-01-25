import { UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtAuthGuard } from './jwt-auth.guard';
import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from './admin.model';
import { CreateAdminDTO } from 'src/dtos/create_admin.dto';
import { UpdateAdminDTO } from 'src/dtos/update_admin.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PassThrough } from 'stream';
import { Response, Request } from 'express';
import { UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { async } from 'rxjs';



@Controller('admin')
export class AdminController {

    constructor(private readonly adminService:AdminService, private readonly jwtService:JwtService){

    }

    @Get('auth')
    async getAuthenticated(@Req() req:Request){
        try {
            const cookie = req.cookies['jwt-3'];
            // const
            console.log("Get cookie getAuth --->", cookie);
            const data = await this.jwtService.verify(cookie);
            if(!data){
                throw new UnauthorizedException();
            }
            console.log("data exist , with success ", data);
            const getUserAuth = await this.adminService.getOne(data._id);
            console.log("get User Auth ", getUserAuth);
            return getUserAuth;
        } catch (error) {
            throw new UnauthorizedException();
        }
    }

    @Get(':id')
    async getOne(@Param('id') id:string){
        const user =await this.adminService.getOne(id);
        console.log("user ", user);
        
        return user;
    }

    @Get()
    async getAll():Promise<Admin[]>{
        return await this.adminService.getAll();
    }

    @Post()
    addOne(@Body() obj:CreateAdminDTO):Promise<Admin>{
        return this.adminService.register(obj);
    }

    @Put(':id')
    async updateOne(@Param('id') id:string, @Body() adminObj:UpdateAdminDTO):Promise<Admin>{
        return await this.adminService.update(id, adminObj);
    }

    @Delete(':id')
    async deleteOne(@Param('id') id:String){
        return await this.adminService.deleteOne(id);
    }

    // @UseGuards(AuthGuard('local'))
    // @UseGuards(JwtAuthGuard)
    @Post('login')
    async login(@Body() loginUser:CreateAdminDTO, @Res({passthrough: true}) res: Response){
        let user =  await this.adminService.getOneByMail(loginUser.email);

        if(!user){
            throw new BadRequestException("invalid email");
        }

        if(!await bcrypt.compare(loginUser.pwd, user.pwd)){
            throw new BadRequestException("invalid pwd");
        }

        const jwt = await this.jwtService.signAsync(
            {_id: user?._id, firstName: user?.firstName, lastName: user?.lastName,
            });
        // console.log("User {", user);
        // console.log(jwt);
        res.cookie('jwt-3', jwt, {httpOnly: true});
        // return {
        //     access_token: this.jwtService.sign(user),
        // };
        return {
            accessToken: jwt,
        };
        // return jwt;
    }

    @Post('logout')
    async logout(@Res({passthrough: true}) res: Response){
        res.clearCookie('jwt-3');
        return {
            message: "success clearing the JWT..",
        }
    }

}
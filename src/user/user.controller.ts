import { 
    Controller, 
    Get, Query, 
    Param, Body,Post,
    Delete, Put, Req, UseGuards} from "@nestjs/common";
import { User } from '../interfaces/user.interface';
import { UserService } from "./user.service";
import { AuthGuard } from "@nestjs/passport";
    
@Controller('api/v1/user') // http://localhost:3000/api/v1/user/
export class UserController {

  constructor(private readonly authService: UserService) {}

  @Post('singUp')
  async singUp(@Req() res: any, @Body() user: User): Promise<User> {  
    return this.authService.signUp(user, res.headers); 
  }

  @Post('singIn')
  async singIn(@Req() res: any, @Body() user: User): Promise<User> {
    return this.authService.signIn(user, res); 
  }

  @Get('list')
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Query() query: any): Promise<User[]> {
    return this.authService.getAllUsers(query);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string): Promise<User> {
    return this.authService.getUser(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: string, @Body() user: User): Promise<User> {
    return this.authService.updateUser(id, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string): Promise<User> {
    return this.authService.deleteUser(id);
  }

}
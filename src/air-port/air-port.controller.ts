import { 
    Controller, 
    Get, Query, 
    Param, Body,Post,
    Delete, Put, Req, UseGuards, Res} from "@nestjs/common";
import { AirPortService } from "./air-port.service";
import { AuthGuard } from "@nestjs/passport";
import { AirPort, IAirPort } from "src/interfaces/airport.interface";
    
@Controller('api/v1/airPort') // http://localhost:3000/api/v1/airPort/
export class AirPortController {

  constructor(private readonly airPortService: AirPortService) {}

  @Post('new')
  @UseGuards(AuthGuard('jwt'))
  async createAirPort(@Req() res: any, @Body() port: IAirPort): Promise<AirPort> {
    return this.airPortService.createAirPort(port, res); 
  }

  @Get('list')
  async getAllAirPorts(@Query() query: any): Promise<AirPort[]> {
    return this.airPortService.getAllAirPorts(query);
  }

  @Get('countries')
  async getCountries(@Res() res) {
    return res.sendFile("countries.json", { root: 'src' });
  }

  @Get(':id')
  async findAirPort(@Param('id') id: string): Promise<AirPort> {
    return this.airPortService.getAirPort(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: string, @Body() port: IAirPort): Promise<AirPort> {
    return this.airPortService.updateAirPort(id, port);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string): Promise<AirPort> {
    return this.airPortService.deleteAirPort(id);
  }

}
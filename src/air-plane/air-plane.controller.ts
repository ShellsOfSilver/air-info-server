import { 
  Controller, 
  Get, Query, 
  Param, Body,Post,
  Delete, Put, Req, UseGuards} from "@nestjs/common";
import { AirPlaneService } from "./air-plane.service";
import { AuthGuard } from "@nestjs/passport";
import { AirPlane, IAirPlane } from "src/interfaces/airplane.interface";
  
@Controller('api/v1/airPlane') // http://localhost:3000/api/v1/airPlane/
export class AirPlaneController {

  constructor(private readonly airPlaneService: AirPlaneService) {}

  @Post('new')
  @UseGuards(AuthGuard('jwt'))
  async createAirPlane(@Req() res: any, @Body() plane: IAirPlane): Promise<AirPlane> {
    return this.airPlaneService.createAirPlane(plane, res); 
  }

  @Get('list')
  async getAllAirPlane(@Query() query: any): Promise<AirPlane[]> {
    return this.airPlaneService.getAllAirPlanes(query);
  }

  @Get(':id')
  async findAirPlane(@Param('id') id: string): Promise<AirPlane> {
    return this.airPlaneService.getAirPlane(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: string, @Body() plane: IAirPlane): Promise<AirPlane> {
    return this.airPlaneService.updateAirPlane(id, plane);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string): Promise<AirPlane> {
    return this.airPlaneService.deleteAirPlane(id);
  }

}
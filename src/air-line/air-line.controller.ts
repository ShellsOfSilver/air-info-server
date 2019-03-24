import { 
  Controller, 
  Get, Query, 
  Param, Body,Post,
  Delete, Put, Req, UseGuards} from "@nestjs/common";
import { AirLineService } from "./air-Line.service";
import { AuthGuard } from "@nestjs/passport";
import { AirLine, IAirLine } from "src/interfaces/airline.interface";
  
@Controller('api/v1/airLine') // http://localhost:3000/api/v1/airLine/
export class AirLineController {

constructor(private readonly airLineService: AirLineService) {}

@Post('new')
@UseGuards(AuthGuard('jwt'))
async createAirLine(@Req() res: any, @Body() Line: IAirLine): Promise<AirLine> {
  return this.airLineService.createAirLine(Line, res); 
}

@Get('list')
async getAllAirLine(@Query() query: any): Promise<IAirLine[]> {
  return this.airLineService.getAllAirLines(query);
}

@Get('form')
async getFormAirLine(@Query() query: any): Promise<IAirLine[]> {
  return this.airLineService.getFormAirLines(query);
}

@Get(':id')
async findAirLine(@Param('id') id: string): Promise<IAirLine> {
  return this.airLineService.getAirLine(id);
}

@Put(':id')
@UseGuards(AuthGuard('jwt'))
async update(@Param('id') id: string, @Body() Line: IAirLine): Promise<AirLine> {
  return this.airLineService.updateAirLine(id, Line);
}

@Delete(':id')
@UseGuards(AuthGuard('jwt'))
async remove(@Param('id') id: string): Promise<AirLine> {
  return this.airLineService.deleteAirLine(id);
}

}
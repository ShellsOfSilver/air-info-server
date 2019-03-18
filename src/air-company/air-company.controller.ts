import { 
  Controller, 
  Get, Query, 
  Param, Body,Post,
  Delete, Put, Req, UseGuards} from "@nestjs/common";
import { AirCompanyService } from "./air-company.service";
import { AuthGuard } from "@nestjs/passport";
import { AirCompany, IAirCompany } from "src/interfaces/air-company.interface";
  
@Controller('api/v1/airCompany') // http://localhost:3000/api/v1/airCompany/
export class AirCompanyController {

constructor(private readonly airCompanyService: AirCompanyService) {}

@Post('new')
@UseGuards(AuthGuard('jwt'))
async createAirCompany(@Req() res: any, @Body() company: IAirCompany): Promise<AirCompany> {
  return this.airCompanyService.createAirCompany(company, res); 
}

@Get('list')
async getAllAirCompany(@Query() query: any): Promise<AirCompany[]> {
  return this.airCompanyService.getAllAirCompanys(query);
}

@Get(':id')
async findAirCompany(@Param('id') id: string): Promise<AirCompany> {
  return this.airCompanyService.getAirCompany(id);
}

@Put(':id')
@UseGuards(AuthGuard('jwt'))
async update(@Param('id') id: string, @Body() company: IAirCompany): Promise<AirCompany> {
  return this.airCompanyService.updateAirCompany(id, company);
}

@Delete(':id')
@UseGuards(AuthGuard('jwt'))
async remove(@Param('id') id: string): Promise<AirCompany> {
  return this.airCompanyService.deleteAirCompany(id);
}

}
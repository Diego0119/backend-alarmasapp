import {
  Controller,
  Get,
  Req,
  UseGuards,
  Body,
  Post,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { PagosService } from './pagos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CrearPagoDto } from './dto/crear-pago.dto';

@Controller('pagos')
@UseGuards(JwtAuthGuard)
export class PagosController {
  constructor(private readonly pagosService: PagosService) {}

  @Get()
  async obtenerHistorial(
    @Req() req,
    @Query('mes') mes?: string,
    @Query('anio') anio?: string,
  ) {
    const userId = req.user.sub;
    const mesNum = mes ? parseInt(mes, 10) : undefined;
    const anioNum = anio ? parseInt(anio, 10) : undefined;
    return this.pagosService.obtenerPagosYAlarmas(userId, mesNum, anioNum);
  }

  @Post('registrar')
  async registrar(@Req() req, @Body() dto: CrearPagoDto) {
    const userId = req.user.sub;
    return this.pagosService.registrarPago(userId, dto);
  }

  @Delete(':idServicio')
  async eliminarPago(@Req() req, @Param('idServicio') idServicio: number) {
    const userId = req.user.sub;
    return this.pagosService.eliminarPago(userId, idServicio);
  }
}

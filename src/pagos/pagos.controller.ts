import { Controller, Get, Req, UseGuards, Body, Post } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CrearPagoDto } from './dto/crear-pago.dto';

@Controller('pagos')
@UseGuards(JwtAuthGuard)
export class PagosController {
  constructor(private readonly pagosService: PagosService) {}

  @Get()
  async obtenerHistorial(@Req() req) {
    const userId = req.user.sub;
    return this.pagosService.obtenerPagosYAlarmas(userId);
  }

  @Post('registrar')
  async registrar(@Req() req, @Body() dto: CrearPagoDto) {
    const userId = req.user.sub;
    return this.pagosService.registrarPago(userId, dto);
  }
}

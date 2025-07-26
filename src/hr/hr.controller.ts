import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Param,
  Body,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { HrService } from './hr.service';
import { CreateHrDto } from './dto/create-hr.dto';


@Controller('hr')
export class HrController {
  constructor(private readonly hrService: HrService) {}

  @Get()
  findAll() {
    return this.hrService.findAllHr();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hrService.findHrById(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('nidImage'))
  create(
    @Body() createHrDto: CreateHrDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.hrService.createHr(createHrDto, file);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('nidImage'))
  update(
    @Param('id') id: string,
    @Body() updateHrDto: CreateHrDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.hrService.updateHr(id, updateHrDto, file);
  }

  @Patch(':id')
  partialUpdate(
    @Param('id') id: string,
    @Body() partialUpdateHrDto: Partial<CreateHrDto>
  ) {
    return this.hrService.partialUpdateHr(id, partialUpdateHrDto);
  }
}

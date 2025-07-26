import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHrDto } from './dto/create-hr.dto';
import { Express } from 'express';
import { createReadStream, existsSync, mkdirSync } from 'fs';

@Injectable()
export class HrService {
  private hrRecords: any[] = [];

  createHr(createHrDto: CreateHrDto, file: Express.Multer.File) {
    const newHr = {
      id: Date.now().toString(),
      ...createHrDto,
      nidImagePath: file ? file.path : null
    };
    this.hrRecords.push(newHr);
    return newHr;
  }
  private hrData: any[] = [];

  findAllHr() {
    return this.hrData;
  }

  findHrById(id: string) {
    const record = this.hrData.find(r => r.id === id);
    if (!record) throw new NotFoundException('HR record not found');
    return record;
  }

  updateHr(id: string, updateHrDto: CreateHrDto, file: Express.Multer.File) {
    const index = this.hrData.findIndex(r => r.id === id);
    if (index === -1) throw new NotFoundException('HR record not found');
    
    const updated = {
      ...updateHrDto,
      id,
      nidImagePath: file?.path || this.hrData[index].nidImagePath,
      updatedAt: new Date()
    };
    this.hrData[index] = updated;
    return updated;
  }

  partialUpdateHr(id: string, partialUpdateHrDto: Partial<CreateHrDto>) {
    const index = this.hrData.findIndex(r => r.id === id);
    if (index === -1) throw new NotFoundException('HR record not found');
    
    this.hrData[index] = {
      ...this.hrData[index],
      ...partialUpdateHrDto,
      updatedAt: new Date()
    };
    return this.hrData[index];
  }
}

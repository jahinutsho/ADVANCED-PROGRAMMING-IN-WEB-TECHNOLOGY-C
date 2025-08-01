import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { Between } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
    const newAdmin = this.adminRepository.create({
      ...createAdminDto,
      joiningDate: new Date()
    });
    return this.adminRepository.save(newAdmin);
  }

  async updateCountry(id: number, country: string): Promise<void> {
    const admin = await this.adminRepository.findOne({ where: { id } });
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }
    admin.country = country;
    try {
      await this.adminRepository.save(admin);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update country');
    }
  }

  async findByJoiningDate(startDate: Date, endDate: Date): Promise<Admin[]> {
    return this.adminRepository.find({
      where: {
        joiningDate: Between(startDate, endDate)
      }
    });
  }

  async findDefaultCountryUsers(): Promise<Admin[]> {
    return this.adminRepository.find({
      where: {
        country: 'Unknown'
      }
    });
  }
}

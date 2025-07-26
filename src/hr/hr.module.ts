import { Module } from '@nestjs/common';
import { HrService } from './hr.service';
import { HrController } from './hr.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  providers: [HrService],
  controllers: [HrController],
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/nid',
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`);
        }
      })
    })
  ],
})
export class HrModule {}

import { Service, ServiceTier } from '@/entities/Service.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceController } from 'src/controllers/ServiceController';
import { ServiceService } from '../services/ServiceService';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Service,
            ServiceTier
        ]),
    ],
    controllers: [ServiceController],
    providers: [
        ServiceService,
    ],
})
export class ServiceModule { }
import { ApplicationException } from '@/controllers/ExceptionController';
import { ServiceTier_Dto, Service_Dto } from '@/dtos/Service_Dto';
import { Service, ServiceTier } from '@/entities/Service.entity';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceService {
    constructor(
        @InjectRepository(ServiceTier) private readonly serviceTierRepository: Repository<ServiceTier>,
        @InjectRepository(Service) private readonly serviceRepository: Repository<Service>,
    ) {
    }

    async getServiceTiers(): Promise<ServiceTier[]> {
        return await this.serviceTierRepository.find();
    }

    async getServiceTierById(id: number): Promise<ServiceTier> {
        return await this.serviceTierRepository.findOne({
            where: { id: id },
            relations: ['services'],
        });
    }

    async createServiceTier(serviceTier: ServiceTier_Dto): Promise<ServiceTier> {
        const data = await this.serviceTierRepository.create({
            ...serviceTier,
            services: [],
            available: serviceTier.slot,
        });

        return await this.serviceTierRepository.save(data);
    }

    async updateServiceTier(id:number, serviceTier: ServiceTier_Dto): Promise<ServiceTier> {
        const oldServiceTier = await this.serviceTierRepository.findOne({
            where: { id: id },
        });

        if (!oldServiceTier) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Service tier not found');
        }

        // if (serviceTier.slot) {
        //     if (serviceTier.slot < oldServiceTier.available) {
        //         throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Slot cannot be less than available');
        //     }

        //     oldServiceTier.available = serviceTier.slot - (oldServiceTier.slot - oldServiceTier.available);
        // }

        const newServiceTier = {
            ...oldServiceTier,
            ...serviceTier,
        };

        return await this.serviceTierRepository.save(newServiceTier);
    }

    async deleteServiceTier(id: number): Promise<void> {
        const serviceTier = await this.serviceTierRepository.findOne({
            where: { id: id },
            relations: ['services', 'services.bookings', 'services.ratings'],
        });
        await this.serviceTierRepository.delete(serviceTier);
    }

    async getServices(): Promise<Service[]> {
        return await this.serviceRepository.find();
    }

    async createService(service: Service_Dto): Promise<Service> {
        const serviceTier = await this.serviceTierRepository.findOne({
            where: { id: service.serviceTierId },
        });

        if (!serviceTier) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Service tier not found');
        }

        const data = await this.serviceRepository.create({
            ...service,
            serviceTier: serviceTier,
        });

        return await this.serviceRepository.save(data);
    }

    async updateService(id:number, service: Service_Dto): Promise<Service> {
        const oldService = await this.serviceRepository.findOne({
            where: { id: id },
        });

        if (!oldService) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Service not found');
        }

        const serviceTier = await this.serviceTierRepository.findOne({
            where: { id: service.serviceTierId },
        });

        if (!serviceTier) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, 'Service tier not found');
        }

        const newService = {
            ...oldService,
            ...service,
            serviceTier: serviceTier,
        };

        return await this.serviceRepository.save(newService);
    }

    async deleteService(id: number): Promise<void> {
        const service = await this.serviceRepository.findOne({
            where: { id: id },
            relations: ['bookings', 'ratings'],
        });

        await this.serviceRepository.delete(service);
    }

    async getServiceById(id: number): Promise<Service> {
        return await this.serviceRepository.findOne({
            where: { id: id },
            relations: ['serviceTier'],
        });
    }
}
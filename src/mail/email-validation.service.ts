import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agent } from './agent.entity';
import { agent } from 'supertest';

@Injectable()
export class EmailValidationService {
  constructor(
    @InjectRepository(Agent)
    private readonly agentRepository: Repository<Agent>,
  ) {}

  async agentExistByEmail(email: string): Promise<boolean> {
    try{
      const agent = await this.agentRepository.findOne({ where: {email} });
    return !!agent;
    } catch (error) {
      console.error('Error during agent existence check:', error);
      return false;
    }
    
  }

}

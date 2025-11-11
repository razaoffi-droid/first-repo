import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
// import { Student } from './student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentsRepo: Repository<Student>,
  ) {}

  create(createDto: CreateStudentDto) {
    const student = this.studentsRepo.create(createDto);
    return this.studentsRepo.save(student);
  }

  findAll() {
    return this.studentsRepo.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const s = await this.studentsRepo.findOne({ where: { id } });
    if (!s) throw new NotFoundException(`Student with id ${id} not found`);
    return s;
  }

  async update(id: number, updateDto: UpdateStudentDto) {
    const student = await this.findOne(id);
    Object.assign(student, updateDto);
    return this.studentsRepo.save(student);
  }

  async remove(id: number) {
    const res = await this.studentsRepo.delete(id);
    if (res.affected === 0) throw new NotFoundException(`Student with id ${id} not found`);
    return { deleted: true };
  }
}

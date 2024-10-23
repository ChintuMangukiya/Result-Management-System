import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Student, StudentService } from './students/students.service';
import { map, Subscription, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataStorageSrevice{
  totalStudents!: Student[];

  subscription!: Subscription;

  constructor(
    private http: HttpClient,
    private studentService: StudentService
  ) {}

  fetchStudents() {

    this.studentService.clearStudents();


      this.http
        .get<Student[]>(
          'https://result-management-system-7b457-default-rtdb.firebaseio.com/students.json'
        )
        .pipe(take(1),
          map((students) => {
            const stds = [];
            for (const key in students) {
              stds.push(students[key]);
            }

            students = Array.from(stds);
            this.studentService.addStudents(students);
            return stds;

            // return students.map((student,i)=>{
            //   return {
            //     ...student,

            //   };
            // });
          })
        )
        .subscribe((students: Student[]) => {
        });
    }


}

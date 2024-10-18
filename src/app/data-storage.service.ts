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

    for (let i = 1; i <= 14; i++) {

      this.http
        .get<Student[]>(
          'https://result-management-system-7b457-default-rtdb.firebaseio.com/class_' +
            String(i)+
            '.json'
        )
        .pipe(take(1),
          map((students) => {
            const stds = [];
            for (const key in students) {
              stds.push(students[key]);
            }
            return stds;

            // return students.map((student,i)=>{
            //   return {
            //     ...student,

            //   };
            // });
          })
        )
        .subscribe((students: Student[]) => {

          students = Array.from(students);
             this.studentService.addStudents(students);
        });
    }

  }

}

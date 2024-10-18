import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

export interface Student {
    gender: string;
    grNo: number;
    name: string;
    rollNo: number;
    std: string;
    marksArray: {marks:number, subject: string}[];
}

  @Injectable({
    providedIn: 'root'
  })

export class StudentService{

    constructor(private http: HttpClient){}

    studentChanged = new Subject<Student[]>();

      students: Student[] = [];

      getStudents(): Student[] {
        return this.students.slice();
      }

      getStudent(id:Number):Student | undefined{
        return this.students.slice().find((e)=>e.grNo == id);
      }

      setStudents(students:Student[]){
        this.students = students;
        this.studentChanged.next(this.students.slice());
      }

      addStudents(students:Student[]){
        for(const student of Array.from(students))
        {
          this.students.push(student);
          this.studentChanged.next(this.students.slice());
        }
      }

      clearStudents(){
        this.students.length = 0;
        this.studentChanged.next([]);
      }
}
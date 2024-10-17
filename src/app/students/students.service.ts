import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Subject } from "rxjs";

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
        return this.students;
      }

      setStudents(students:Student[]){
        this.students= Array.from(students);
        this.studentChanged.next(this.students.slice());
      }

      addStudents(students:Student[]){

        for(const student of students)
        {
          this.students.push(student);
          this.studentChanged.next(this.students.slice());
        }
        
      }

}
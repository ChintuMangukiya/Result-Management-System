import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { classesService } from 'src/assets/classes.service';
import { DataStorageSrevice } from '../data-storage.service';
import { Student, StudentService } from '../students/students.service';
import { Subscription } from 'rxjs';

interface std {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css'],
})
export class AddEditComponent implements OnInit {

  isLoading= false;

  subjectMarksForm: FormGroup;

  subjects!: any[];

  id : number = 0;

  editMode = false;

  subjectsLazy!: any[];

  studentSubscription!: Subscription;

  std = -1;

  Student: any;

  standards: std[] = [
    { value: 1, viewValue: '1' },
    { value: 2, viewValue: '2' },
    { value: 3, viewValue: '3' },
    { value: 4, viewValue: '4' },
    { value: 5, viewValue: '5' },
    { value: 6, viewValue: '6' },
    { value: 7, viewValue: '7' },
    { value: 8, viewValue: '8' },
    { value: 9, viewValue: '9' },
    { value: 10, viewValue: '10' },
    { value: 11, viewValue: '11 A' },
    { value: 12, viewValue: '11 B' },
    { value: 13, viewValue: '12 A' },
    { value: 14, viewValue: '12 B' },
  ];

  constructor(private http: HttpClient, private classService: classesService, private router: Router, public dataStorageService: DataStorageSrevice, public route: ActivatedRoute, private  studentService: StudentService) {
    this.subjectMarksForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      std: new FormControl(null, [Validators.required]),
      grNo: new FormControl(null, [Validators.required]),
      rollNo: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      marks: new FormArray([])
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });


    this.studentSubscription = this.studentService.studentChanged.subscribe((e: Student[])=>{
      this.Student = this.studentService.getStudent(this.id);
      this.initForm();
    });
  }

  private initForm(){

    if(this.editMode)
    {
      console.log(this.editMode);
      console.log(this.Student);
      this.subjectMarksForm.patchValue({...this.Student});

      this.marksArray.clear();
  
      this.Student?.marksArray.forEach((subject: {subject: string, marks: number})=> {
        this.marksArray.push(
          new FormGroup({
            subject: new FormControl(subject.subject), // Subject Name
            marks: new FormControl(subject.marks, [Validators.required, Validators.min(0), Validators.max(100)]) // Marks Input
      })
      )
      })
  
    }
  }


  onSubmit() {


    switch(this.subjectMarksForm.value.std)
    {
      case 11: this.subjectMarksForm.value.std = '11 A';
           break;
      case 12: this.subjectMarksForm.value.std = '11 B';
           break;
      case 13: this.subjectMarksForm.value.std = '12 A';
           break;
      case 14: this.subjectMarksForm.value.std = '12 B';
           break;
           
      default: this.subjectMarksForm.value.std = this.subjectMarksForm.value.std;
                break;
    }

    this.isLoading = true;

    console.log(this.subjectMarksForm.value);


    if(!this.editMode)
      {
    this.http
      .post(
        'https://result-management-system-7b457-default-rtdb.firebaseio.com/students.json',
        {
          name: this.subjectMarksForm.value.name,
          std: this.subjectMarksForm.value.std,
          grNo: this.subjectMarksForm.value.grNo,
          rollNo: this.subjectMarksForm.value.rollNo,
          gender: this.subjectMarksForm.value.gender,
          marksArray: this.subjectMarksForm.value.marks
        }
      )
      .subscribe(
      );
    this.subjectMarksForm.reset();

    this.isLoading = true;



    setTimeout(()=>{
      this.dataStorageService.fetchStudents();
      this.router.navigate(['/']);
      this.isLoading = false;
    }, 4000);
  }

  else{
    // const url = `https://result-management-system-7b457-default-rtdb.firebaseio.com/students/${this.Student.}`
  }

  }

  get marksArray(): FormArray{
    return this.subjectMarksForm.get('marks') as FormArray;
  }

  getSubjects() {

    this.subjects = this.classService.getSubjects(
      this.subjectMarksForm.value.std - 1
    ) || [] ;
    
    this.marksArray.clear();

    this.subjects.forEach((subject)=> {
      this.marksArray.push(
        new FormGroup({
          subject: new FormControl(subject), // Subject Name
          marks: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]) // Marks Input
    })
    )
    })

  }
}

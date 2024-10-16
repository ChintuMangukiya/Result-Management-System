import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

interface std{
  value: number,
  viewValue: string
}

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit{

  studentForm : FormGroup;

  standards : std[] = [
    {value: 1, viewValue: '1'},
    {value: 2, viewValue: '2'},    
    {value: 3, viewValue: '3'},
    {value: 4, viewValue: '4'},
    {value: 5, viewValue: '5'},
    {value: 6, viewValue: '6'},
    {value: 7, viewValue: '7'},
    {value: 8, viewValue: '8'},
    {value: 9, viewValue: '9'},
    {value: 10, viewValue: '10'},
    {value: 11, viewValue: '11 A'},
    {value: 12, viewValue: '11 B'},
    {value: 13, viewValue: '12 A'},
    {value: 14, viewValue: '12 B'}
  ];

  constructor(){
    this.studentForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'std' : new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.studentForm.value);

    this.studentForm.reset();
  }

}

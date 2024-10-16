import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit{

  studentForm : FormGroup;

  classes = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11 A',
    '11 B',
    '12 A',
    '12 B'
  ];

  constructor(){
    this.studentForm = new FormGroup({
      'name': new FormControl(null, [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.studentForm.value);

    this.studentForm.reset();
  }

}

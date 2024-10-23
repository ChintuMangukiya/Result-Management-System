import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { Subscription } from 'rxjs';
import { Student, StudentService } from './students.service';
import { classesService } from 'src/assets/classes.service';

@Component({
  selector: 'students-table',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  public rowData!: Student[];
  studentSubscription!: Subscription;
  public classes!: {};

  students: Student[] = [];

  masterDetail = true;

  constructor(private studentsService: StudentService, private classService: classesService) {}

  ngOnInit(): void {
    this.studentSubscription = this.studentsService.studentChanged.subscribe((e:Student[])=>{
      this.rowData = e;
    });

    this.rowData = this.studentsService.getStudents();
    this.classes = this.classService.getClasses();
  }
  // Column Definitions
  // public columnDefs: ColDef[] = [
  //   { field: 'make', sortable: true, filter: true },
  //   { field: 'model', sortable: true, filter: true },
  //   { field: 'price', sortable: true, filter: true },
  // ];
  
  radioCellRenderer(params: any): string {
    const checkedMale = params.data.gender === 'male' ? 'checked' : '';
    const checkedFemale = params.data.gender === 'female' ? 'checked' : '';

    return `
      <div>
        <label>
          <input type="radio" name="gender_${params.rowIndex}" value="male" ${checkedMale} 
                 onchange="updateGender('${params.data.name}', 'male')" /> Male
        </label>
        <label>
          <input type="radio" name="gender_${params.rowIndex}" value="female" ${checkedFemale} 
                 onchange="updateGender('${params.data.name}', 'female')" /> Female
        </label>
      </div>
    `;
  }

  public columnDefs: ColDef[] = [
    { field: 'std',
      sortable: true, 
      filter: true , 
      editable: true, 
      cellRenderer: (params: any)=>{
        return `<a style='color:black; text-decoration: none' class='link' href="report-card/${params.value}" target="_blank">${params.value}</a>`;
      }
    },
    { headerName: "Gr No.",field: 'grNo', filter: true,editable: true,
      cellRenderer: (params: any)=>{
        return `<a style='color:black; text-decoration: none' class='link' href="report-card/${params.value}" target="_blank">${params.value}</a>`;
      }
      , sortable: true
    },
    { field: 'rollNo', sortable: true, filter: true, editable: true, 
      cellRenderer: (params: any)=>{
        return `<a style='color:black; text-decoration: none' class='link' href="report-card/${params.value}" target="_blank">${params.value}</a>`;
      }},
    { field: 'name', sortable: true, filter: true, editable: true, 
      cellRenderer: (params: any)=>{
        return `<a style='color:black; text-decoration: none' class='link' href="report-card/${params.value}" target="_blank">${params.value}</a>`;
      }},
    { 
      headerName: 'Gender',
      field: 'gender', sortable: true, filter: true, editable: true,
      cellRenderer: (params: any) => {
        // Ensure that a default value is set (if not present, default to 'Male')
        if (!params.data.gender) {
          params.setValue('male'); // Sets default value as 'Male'
        }

        // Create a wrapper div to contain the radio buttons
        const genderContainer = document.createElement('div');
        genderContainer.classList.add('gender-container');

        // Create the male radio button
        const maleInput = document.createElement('input');
        maleInput.type = 'radio';
        maleInput.name = `gender-${params.node.id}`;  // Unique name for each row
        maleInput.checked = params.value === 'male';   // Check if value is 'Male'
        maleInput.addEventListener('change', () => params.setValue('male'));

        // Create the female radio button
        const femaleInput = document.createElement('input');
        femaleInput.type = 'radio';
        femaleInput.name = `gender-${params.node.id}`;  // Unique name for each row
        femaleInput.checked = params.value === 'female';  // Check if value is 'Female'
        femaleInput.addEventListener('change', () => params.setValue('female'));

        // Create labels for the radio buttons
        const maleLabel = document.createElement('label');
        maleLabel.innerHTML = 'male';
        const femaleLabel = document.createElement('label');
        femaleLabel.innerHTML = 'female';

        // Append radio buttons and labels to the container
        genderContainer.appendChild(maleInput);
        genderContainer.appendChild(maleLabel);
        genderContainer.appendChild(femaleInput);
        genderContainer.appendChild(femaleLabel);

        return genderContainer;
      }

    },
    {
      field: 'Operartions',
      cellRenderer: ()=>{
        return `<a style="background-color:rgb(51, 136, 51); padding: 8px; width: 100px !important; border: none; margin-right: 4px; border-radius: 4px; color: white">Update</a>
        <a style="background-color:rgb(228, 65, 65); padding: 8px; border: none; width: 100px !important; border-radius: 4px; margin-left: 2px; color: white">Delete</a>`
      }
    }
  ];



  onGridReady(params: any) {
    params.api.forEachNode((node: any) => {
      if (!node.data.gender) {
        node.data.gender = 'male'; // Set default 'Male' for rows with no gender
      }
    });
    params.api.refreshCells(); // Ensure that the grid reflects the default values
    params.api.sizeColumnsToFit();
  }


  onCellValueChanged(params: any) {
    console.log('Gender changed to: ', params.data.gender);
  }


  
  // Row Data
  // public rowData = [
  //   { make: 'Toyota', model: 'Celica', price: 35000 },
  //   { make: 'Ford', model: 'Mondeo', price: 32000 },
  //   { make: 'Porsche', model: 'Boxster', price: 72000 },
  // ];

  // Default column definitions
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };
}

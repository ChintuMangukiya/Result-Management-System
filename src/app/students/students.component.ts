import { Component, OnInit } from '@angular/core';
import { ColDef, Params } from 'ag-grid-community';
import { Subscription, take } from 'rxjs';
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
    { field: 'gender', sortable: true, filter: true, editable: true, 
      cellRenderer: (params: any)=>{
        return `<a style='color:black; text-decoration: none' class='link' href="report-card/${params.value}" target="_blank">${params.value}</a>`;
      }},
    {
      field: 'Operartions',
      cellRenderer: ()=>{
        return `<a style="background-color:rgb(51, 136, 51); padding: 10px; border: none; border-radius: 3px; color: white">Update</a>
        <a style="background-color:rgb(228, 65, 65); padding: 10px; border: none; border-radius: 3px; margin-left: 2px; color: white">Delete</a>`
      }
    }
  ];


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
  isRowMaster = (dataItem: any) => {
    return dataItem ? dataItem.details.length > 0 : false;
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ColDef, FirstDataRenderedEvent } from 'ag-grid-community';
import { map, Subscription } from 'rxjs';
import { Student, StudentService } from './students.service';
import { classesService } from 'src/assets/classes.service';


@Component({
  selector: 'students-table',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit, OnDestroy {
  public rowData!: Student[];
  studentSubscription!: Subscription;
  public classes!: {};

  masterDetail = true;

  constructor(private studentsService: StudentService, private classService: classesService) {}

  ngOnInit(): void {
    this.rowData = this.studentsService.getStudents();

    this.classes = this.classService.getClasses();
    this.studentSubscription = this.studentsService.studentChanged.subscribe(
      (students: Student[]) => {
        this.rowData = students;
        console.log(this.rowData);
      }
    );
  }
  // Column Definitions
  // public columnDefs: ColDef[] = [
  //   { field: 'make', sortable: true, filter: true },
  //   { field: 'model', sortable: true, filter: true },
  //   { field: 'price', sortable: true, filter: true },
  // ];


  onFirstDataRendered(params: FirstDataRenderedEvent) {
    // arbitrarily expand a row for presentational purposes
    setTimeout(() => {
      params.api.getDisplayedRowAtIndex(1)!.setExpanded(true);
    }, 0);
  }

  public columnDefs: ColDef[] = [
    { field: 'std', sortable: true, filter: true },
    { field: 'grNo', sortable: true, filter: true },
    { field: 'rollNo', sortable: true, filter: true },
    { field: 'name', sortable: true, filter: true },
    { field: 'gender', sortable: true, filter: true },
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

  // Grid ready event handler
  onGridReady(params: any) {
    params.api.sizeColumnsToFit();
  }

  ngOnDestroy(): void {
    this.studentSubscription.unsubscribe();
  }
}

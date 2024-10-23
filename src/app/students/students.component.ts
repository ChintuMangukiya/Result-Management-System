import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { Subscription } from 'rxjs';
import { Student, StudentService } from './students.service';
import { FirebaseService } from './firebase.service';


@Component({
  selector: 'students-table',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit{

  paginationPageSizeSelector = [2, 5, 100];

  public rowData: Student[] = [];

  public completeData: Student[] = [];
  studentSubscription!: Subscription;
  public classes!: {};
  public currentPage = 5;
  private gridApi: any; // Store the grid API reference

  students: Student[] = [];


  ngOnInit(): void {
    this.loadCompleteData();
  }

  constructor(private firebaseServeice: FirebaseService, private studentService: StudentService) {}
  public pageSize = 2;


  public columnDefs: ColDef[] = [
    { field: 'std',
      sortable: true, 
      filter: true , 
      editable: true, 
      sort: 'asc',
      cellRenderer: (params: any)=>{
        return `<a style='color:black; text-decoration: none' class='link' href="report-card/${params.data.grNo}" target="_blank">${params.value}</a>`;
      }
    },
    { headerName: "Gr No.",field: 'grNo', filter: true,editable: true,
      cellRenderer: (params: any)=>{
        return `<a style='color:black; text-decoration: none' class='link' href="report-card/${params.data.grNo}" target="_blank">${params.value}</a>`;
      }
      , sortable: true
    },
    { field: 'rollNo', sortable: true, filter: true, editable: true, 
      cellRenderer: (params: any)=>{
        return `<a style='color:black; text-decoration: none' class='link' href="report-card/${params.data.grNo}" target="_blank">${params.value}</a>`;
      }},
    { field: 'name', sortable: true, filter: true, editable: true, 
      cellRenderer: (params: any)=>{
        return `<a style='color:black; text-decoration: none' class='link' href="report-card/${params.data.grNo}" target="_blank">${params.value}</a>`;
      }},
    { field: 'gender', sortable: true, filter: true, editable: false, 
      cellRenderer: (params: any) => {
        const maleChecked = params.value === 'male' ? 'checked' : '';
        const femaleChecked = params.value === 'female' ? 'checked' : '';

        return `
          <label>
            <input type="radio" name="gender-${params.node.id}" value="male" ${maleChecked} onclick="updateGender(${params.node.rowIndex}, 'male')"/>
            Male
          </label>
          <label>
            <input type="radio" name="gender-${params.node.id}" value="=female" ${femaleChecked} onclick="updateGender(${params.node.rowIndex}, 'female')"/>
            Female
          </label>
        `;

      }
    },
    {
      field: 'Operartions',
      sortable: false,
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



  onGridReady(params: any) {
    this.gridApi = params.api; // Store the grid API
    this.loadCompleteData(); // Load initial complete data
  }

  private loadCompleteData() {
    this.firebaseServeice.getData(this.currentPage, this.pageSize).subscribe((data) => {

      this.rowData = data; // Store complete data
      this.gridApi.setRowData(this.rowData); // Update row data to display
    });
  }


  onPaginationChanged() {
    this.currentPage = this.gridApi.getCurrentPage() + 1; // Update current page
    this.loadCompleteData(); // Load data for the current page
  }



  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };

}

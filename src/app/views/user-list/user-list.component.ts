import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { interval } from 'rxjs';
import { LiveAnnouncer } from '@angular/cdk/a11y';

import { SelectionModel } from '@angular/cdk/collections';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {  ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
// import { ApexOptions } from 'ng-apexcharts';
import { Subject, takeUntil } from 'rxjs';
import swal from 'sweetalert2';
import { UserDetailComponent } from '../user-detail/user-detail.component';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @ViewChild('recentTransactionsTable', {read: MatSort}) recentTransactionsTableMatSort!: MatSort;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;
  raffleName: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = ['avatar','id','first_name','last_name','email', 'acciones'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _userService: UserService,
    private _formBuilder: FormBuilder,    
      private snackBar:MatSnackBar,  
      private _matDialog: MatDialog,
      private cdref: ChangeDetectorRef,
      private _liveAnnouncer: LiveAnnouncer, 
      private router: Router)
    {
    }
  
    columnas = [ 
      {title: 'Avatar', name: 'avatar'},
      {title: 'ID', name: 'id'},
      {title: 'Nombre', name: 'first_name'},
      {title: 'Apellido', name: 'last_name'},
      {title: 'Correo', name: 'email'},
      {title: 'Acciones', name: 'acciones'},

    ]
  
  
    announceSortChange(sortState: Sort) {
      if (sortState.direction) {
        this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
        this._liveAnnouncer.announce('Sorting cleared');
      }
    }
    //metodo para animmación de columnas, para que se puedan mover de manera horizontal 
      drop(event: CdkDragDrop<string[]>){
          moveItemInArray(this.columnsToDisplay, event.previousIndex, event.currentIndex);
      }

    ngAfterContentChecked() {
      this.cdref.detectChanges();
     }

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.getUserData();
    }
       
      //metodo de filtrar los datos de las columnas
      applyFilter(event: Event) {
          const filterValue = (event.target as HTMLInputElement).value;
          this.dataSource.filter = filterValue.trim().toLowerCase();  
        }

    ngAfterViewInit(): void
    {
        // Make the data source sortable
        this.dataSource.sort = this.recentTransactionsTableMatSort;
    }


    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

  
    selectRowFull(userId: any) {    
        // this.router.navigateByUrl('pages/usuario/detalle/' + userId.id)
  }
 
  getUserData(){
            // Get the data
    this._userService.getAllUser()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((data) => {                  
      this.dataSource= new MatTableDataSource(data.data);
      this.dataSource.sort= this.sort;
      this.dataSource.data = data.data;  
      console.log('datos',data.data);
    });
  }
    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
 
    async getUser(id: any, po: any) {
        (await this._userService.getUser(id)).subscribe((Response) => {
            this.dataSource.data[po].TicketCount =  Response.length;
        });

    }

    editUser(user: any){
      const dialogRef =  this._matDialog.open(UserDetailComponent, {
        autoFocus: false,
        data     : {
          user
        }
      });
      dialogRef.afterClosed().subscribe((result) => {
        if(result == 'confirmed'){
          this.getUserData();
        }
    }); 
    }
    
    deleteUser(element: any)
    {
      swal.fire({
        title: 'Deseas eliminar este registro?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        denyButtonText: `NO eliminar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          swal.fire('Saved!', '', 'success')
          
        } else if (result.isDenied) {
          swal.fire('Changes are not saved', '', 'info')
        }
      })

    }
     async deleteconfirm(id: any){
        (await this._userService.deleteUser(id)).subscribe((data : any) =>{
        if(data){
          this.snackBar.open('Registro Eliminado','Eliminado',{
            duration:2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }else{
          this.snackBar.open('Ha ocurrido un error','vuelve a intentarlo',{
            duration:2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      })
    }


}

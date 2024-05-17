import { MatTableDataSource } from '@angular/material/table';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Artikl } from 'src/app/models/artikl';
import { Subscription } from 'rxjs';
import { ArtiklService } from 'src/app/services/artikl.service';
import { MatDialog } from '@angular/material/dialog';
import { ArtiklDialogComponent } from 'src/app/dialogs/artikl-dialog/artikl-dialog.component';

@Component({
  selector: 'app-artikl',
  templateUrl: './artikl.component.html',
  styleUrls: ['./artikl.component.css']
})
export class ArtiklComponent implements OnInit, OnDestroy{

  displayedColumns = ['id', 'naziv', 'proizvodjac', 'actions'];
  dataSource!:MatTableDataSource<Artikl>;
  subsription!:Subscription;

  constructor(private service:ArtiklService, public dialog:MatDialog){}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subsription.unsubscribe();
  }

  public loadData() {
    this.subsription = this.service.getAllArtikls().subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource(data);
      }
    ),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
    }
  }

  public openDialog(flag:number, id?:number, naziv?:string, proizvodjac?: string) {
    const dialogRef = this.dialog.open(ArtiklDialogComponent, { data: {id, naziv, proizvodjac }});
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(
      (result) => {
        (result == 1)
          this.loadData();
      }
    )
  }

}

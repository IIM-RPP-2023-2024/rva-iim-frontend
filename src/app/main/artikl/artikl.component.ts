import { MatTableDataSource } from '@angular/material/table';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Artikl } from 'src/app/models/artikl';
import { Subscription } from 'rxjs';
import { ArtiklService } from 'src/app/services/artikl.service';

@Component({
  selector: 'app-artikl',
  templateUrl: './artikl.component.html',
  styleUrls: ['./artikl.component.css']
})
export class ArtiklComponent implements OnInit, OnDestroy{

  displayedColumns = ['id', 'naziv', 'proizvodjac', 'actions'];
  dataSource!:MatTableDataSource<Artikl>;
  subsription!:Subscription;

  constructor(private service:ArtiklService){}

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

}

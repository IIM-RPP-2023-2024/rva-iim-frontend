import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Artikl } from 'src/app/models/artikl';
import { ArtiklService } from 'src/app/services/artikl.service';

@Component({
  selector: 'app-artikl-dialog',
  templateUrl: './artikl-dialog.component.html',
  styleUrls: ['./artikl-dialog.component.css']
})
export class ArtiklDialogComponent {
  flag!:number;

  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<Artikl>,
    @Inject (MAT_DIALOG_DATA) public data: Artikl,
    public service: ArtiklService
  ) {  }

  public add() {
    this.service.addArtikl(this.data).subscribe(
      (data) => {
        this.snackBar.open(`Artikl sa nazivom ${data.naziv} je uspešno dodat`, "U redu", {duration: 3500});
      }
    ),
    (error: Error) => {
        console.log(error.name + ' ' + error.message);
        this.snackBar.open(`Neuspešno dodavanje!`, "Zatvori", {duration: 3500});
    }
  }

  public update() {
    this.service.updateArtikl(this.data).subscribe(
      (data) => {
        this.snackBar.open(`Artikl sa id ${data.id} je uspešno ažuriran`, "U redu", {duration: 3500});
      }
    ),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open(`Neuspešno ažuriranje!`, "Zatvori", {duration: 3500});
    }
  }

  public delete() {
    this.service.deleteArtikl(this.data.id).subscribe(
      (data) => {
        this.snackBar.open(`Artikl je uspešno obrisati`, "U redu", {duration: 3500});
      }
    ),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open(`Neuspešno brisanje!`, "Zatvori", {duration: 3500});
    }
  }

  public cancel() {
    this.dialogRef.close();
    this.snackBar.open(`Odustali ste od izmene!`, "Zatvori", {duration: 3500});
  }
}

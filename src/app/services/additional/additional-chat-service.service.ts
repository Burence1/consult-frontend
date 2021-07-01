import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AdditionalChatServiceService {

  animal: string;
  name: string;
  dialogRef: any;
  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  public openDialog(content: any, width?: any, val?: any): void {
    this.dialogRef = this.dialog.open(content, {
      width: width || '300px',
      maxHeight: '300px',
      data: val || {},
    });


    this.dialogRef.afterClosed().subscribe((_result: any) => {
      console.log('The dialog was closed');
    });
  }

  public closeModal() {
    this.dialogRef.close()
  }

  public openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}

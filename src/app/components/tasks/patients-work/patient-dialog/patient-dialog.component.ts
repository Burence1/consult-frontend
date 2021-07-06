import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Patient } from '../models/patient';

@Component({
  selector: 'app-patient-dialog',
  templateUrl: './patient-dialog.component.html',
  styleUrls: ['./patient-dialog.component.css']
})
export class PatientDialogComponent implements OnInit {
  private backupPatient: Partial<Patient> = { ...this.data.patient}

  constructor(public dialogRef: MatDialogRef<PatientDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: PatientDialogData) { }

  ngOnInit(): void {
  }

  cancel(): void{
    this.data.patient.firstName = this.backupPatient.firstName;
    this.data.patient.lastName = this.backupPatient.lastName;
    this.data.patient.email = this.backupPatient.email;
    this.dialogRef.close(this.data);
  }
}

export interface PatientDialogData{
  patient: Partial<Patient>;
  enableDelete: boolean;
}

export interface PatientDialogResult{
  patient: Patient;
  delete?: boolean;
}

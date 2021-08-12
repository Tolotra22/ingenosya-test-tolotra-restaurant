import { Component, OnInit, Optional } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor(private router: Router, @Optional() private dialogRef: MatDialogRef<AlertComponent>) { }

  ngOnInit(): void {
  }

  onChangePage(){
    this.router.navigate(['/list-book'])
    this.dialogRef.close(true)
  }

  close(){
    this.dialogRef.close(false)
  }

}

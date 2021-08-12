import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Food } from '../models/food.model';
import { FoodService } from '../services/food.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddFoodComponent } from '../add-food/add-food.component';

@Component({
  selector: 'app-list-food',
  templateUrl: './list-food.component.html',
  styleUrls: ['./list-food.component.css'],
})
export class ListFoodComponent implements OnInit, OnDestroy, AfterViewInit {
  foodSubscription: Subscription;
  displayColumns: string[] = ['id', 'name', 'price'];
  dataSource: MatTableDataSource<Food>;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  constructor(private foodService: FoodService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.foodSubscription = this.foodService.foodSubject.subscribe((value) => {
      this.dataSource = new MatTableDataSource(value);
    });
    this.foodService.emitFoodSubject();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDiaglog() {
    const dialogRef = this.dialog.open(AddFoodComponent, {
      autoFocus: true,
      disableClose: true,
      height: '80%',
      data: {
        title: 'Créer une commande',
      },
    });
    dialogRef.afterClosed().subscribe((data: Food) => {
      if(data){
        const id = this.dataSource.data[(this.dataSource.data.length - 1)].id + 1;
        const newFood = data
        newFood.id = id
        this.foodService.addFood(newFood)
      }
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  ngOnDestroy(): void {
    this.foodSubscription.unsubscribe();
  }
}

import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AlertComponent } from '../alert/alert.component';
import { FoodFormComponent } from '../food-form/food-form.component';
import { Food } from '../models/food.model';
import { ForSale } from '../models/forSale.model';
import { FoodService } from '../services/food.service';
import { ForSaleService } from '../services/forSale.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit, AfterViewInit, OnDestroy {
  foodSubscription: Subscription;
  forSaleSubcription: Subscription;
  // FOR TABLE ONE
  dataSource: MatTableDataSource<Food>;
  displayColumns: string[] = ['name', 'price', 'ingredients', 'add'];
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  // FOR TABLE TWO
  columnsForSale: string[] = ['quantity', 'name', 'ingredients', 'price'];
  forSales: ForSale[];
  
  
  @ViewChild('data') data: ElementRef;
  constructor(
    private foodService: FoodService,
    private dialog: MatDialog,
    private forSaleService: ForSaleService,
  ) {}

  ngOnInit(): void {
    this.foodSubscription = this.foodService.foodSubject.subscribe(
      (value: Food[]) => {
        this.dataSource = new MatTableDataSource(value);
      }
    );
    this.forSaleSubcription = this.forSaleService.forSaleSubject.subscribe((data: ForSale[]) => {
      this.forSales = data
    })
    this.foodService.emitFoodSubject();
    this.forSaleService.emitForSaleSubject()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(e: Event) {
    const filterValue = (e.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  add(el: Food) {
    const dialogRef = this.dialog.open(FoodFormComponent, {
      disableClose: true,
      height: '80%',
      data: el,
    });

    dialogRef.afterClosed().subscribe((data: ForSale) => {
      if (data) {
        let newData = data
        newData.price = data.price * data.quantity
        this.forSaleService.addForSale(newData)
      }
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  get totalPrice(): number{
    return this.forSales.map(item => item.price).reduce((a, b) => a + b, 0);
  }

  onSend(){
    const alertRef =  this.dialog.open(AlertComponent, {
      width: '90%',
      position: {
        top: '20px'
      }
    })
    alertRef.afterClosed().subscribe((isChange) => {
      if(isChange)this.forSaleService.reset()
    })
  }

  openPDF(): void {
    let data = document.getElementById('data') as HTMLElement
    html2canvas(data).then(canvas => {
      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURL = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4')
      let position = 0
      PDF.addImage(FILEURL, 'PNG', 0, position, fileWidth, fileHeight)
      PDF.save('facture.pdf')
    })
  }

  cancel(): void  {
    this.forSaleService.reset()
  }

  ngOnDestroy(): void {
    this.foodSubscription.unsubscribe();
    this.forSaleSubcription.unsubscribe();
  }
}


import { Subject } from 'rxjs';
import { ForSale } from '../models/forSale.model';


export class ForSaleService {
    forSaleSubject: Subject<ForSale[]> = new Subject<ForSale[]>();
  private forSale: ForSale[] = []

  emitForSaleSubject() {
    this.forSaleSubject.next(this.forSale.slice());
  }

  addForSale(newItem: ForSale) {
    this.forSale.push(newItem);
    this.emitForSaleSubject()
  }

  reset(){
    this.forSale = []
    this.emitForSaleSubject()
  }
}

import { Subject } from 'rxjs';
import { Food } from '../models/food.model';


export class FoodService {
  foodSubject: Subject<Food[]> = new Subject<Food[]>();
  private food: Food[] = [
    {
      id: 1,
      price: 10,
      name: 'hamburger',
      ingredients: [
        { quantity: 1, unity: '', name: 'pain burger' },
        { quantity: 2, unity: '', name: 'tomates' },
        { quantity: 1, unity: '', name: 'oeuf' },
        { quantity: 1, unity: '', name: 'salade' },
        { quantity: 1, unity: '', name: 'oignon' },
        { quantity: 0.5, unity: 'kg', name: 'mortadelle' },
      ],
    },
    {
      id: 2,
      price: 5,
      name: 'pomme frites',
      ingredients: [{ quantity: 0.2, unity: 'kg', name: 'pommes de terre' }],
    },
    {
      id: 3,
      price: 5,
      name: 'yaourt',
      ingredients: [
        { quantity: 0.2, unity: 'litres', name: 'lait' },
        { quantity: 0.2, unity: 'g', name: 'sucre' },
        { quantity: 0.1, unity: 'litres', name: 'yaourt nature' },
      ],
    },

    {
      id: 4,
      price: 10,
      name: 'double hamburger',
      ingredients: [
        { quantity: 1, unity: '', name: 'pain burger' },
        { quantity: 2, unity: '', name: 'tomates' },
        { quantity: 1, unity: '', name: 'oeuf' },
        { quantity: 1, unity: '', name: 'salade' },
        { quantity: 1, unity: '', name: 'oignon' },
        { quantity: 0.5, unity: 'kg', name: 'mortadelle' },
      ],
    },
    {
      id: 5,
      price: 5,
      name: 'pizza',
      ingredients: [{ quantity: 0.2, unity: 'kg', name: 'pommes de terre' }],
    },
    {
      id: 6,
      price: 5,
      name: 'crêpe',
      ingredients: [
        { quantity: 0.2, unity: 'litres', name: 'lait' },
        { quantity: 0.2, unity: 'g', name: 'sucre' },
        { quantity: 0.1, unity: 'litres', name: 'yaourt nature' },
      ],
    },
  ];

  emitFoodSubject() {
    this.foodSubject.next(this.food.slice());
  }

  addFood(food: Food) {
    this.food.push(food);
    this.emitFoodSubject()
  }
}

import { Ingredient } from "./ingredient.model";

export interface ForSale {
    name: string;
    quantity: number;
    price: number;
    ingredient: Array<Ingredient>
}
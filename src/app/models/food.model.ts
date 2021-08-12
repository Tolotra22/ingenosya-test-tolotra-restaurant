import { Ingredient } from "./ingredient.model";

export interface Food {
  id: number;
  price: number;
  name: string;
  ingredients: Array<Ingredient>;
}

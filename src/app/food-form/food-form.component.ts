import { Component, Inject, OnInit, Optional } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Food } from '../models/food.model';
import { Ingredient } from '../models/ingredient.model';

@Component({
  selector: 'app-food-form',
  templateUrl: './food-form.component.html',
  styleUrls: ['./food-form.component.css'],
})
export class FoodFormComponent implements OnInit {
  title: string;
  price: number;
  ingredients: Ingredient[];
  foodForm: FormGroup;
  private numberRegex: RegExp = /[0-9]/;
  constructor(
    private formBuilder: FormBuilder,
    // @Optional() for Inject MatDialogRef<AddFoodComponent>
    @Optional() private dialogRef: MatDialogRef<FoodFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Food
  ) {
    this.title = this.data.name;
    this.price = this.data.price;
    this.ingredients = this.data.ingredients;
  }

  ngOnInit() {
    this.foodForm = this.formBuilder.group({
      name: [this.title],
      price: [this.price],
      quantity: ['1', [Validators.required, Validators.pattern(this.numberRegex)]],
      ingredients: this.formBuilder.array([], [Validators.required])
    });
  }

  get control(): FormArray{
    return this.foodForm.get('items') as FormArray
  }

  onChange(e: MatCheckboxChange) {
    const ingredients = this.foodForm.get('ingredients') as FormArray
    if(e.checked){
      ingredients.push(new FormControl(e.source.value))
    }else {
      let i = 0;
      ingredients.controls.forEach((item) => {
        if(item.value === e.source.value) 
        {
          ingredients.removeAt(i)
          return
        }
        i++;
      })
    }
  }

  submit() {
    console.log(this.foodForm.value['ingredients']); 
    this.dialogRef.close(this.foodForm.value)
  }

  close() {
    this.dialogRef.close();
  }
}

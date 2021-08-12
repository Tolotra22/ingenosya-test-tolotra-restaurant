import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Food } from '../models/food.model';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css'],
})
export class AddFoodComponent implements OnInit {
  foodForm: FormGroup;
  private nameRegex: RegExp = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
  private numberRegex: RegExp = /^\d+(\.\d{1,})?$/;
  private unityRegex: RegExp = /[a-zA-Z]/g;
  title: string;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    // @Optional() for Inject MatDialogRef<AddFoodComponent>
    @Optional() private dialogRef: MatDialogRef<AddFoodComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.title = data.title;
  }

  ngOnInit(): void {
    this.foodForm = this.fb.group({
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
          Validators.pattern(this.nameRegex),
        ]),
      ],
      price: [
        null,
        Validators.compose([
          Validators.required,
          Validators.min(1),
          Validators.pattern(this.numberRegex),
        ]),
      ],
      ingredients: this.fb.array([this.newIngredient()]),
    });
  }

  get ingredients(): FormArray {
    return this.foodForm.get('ingredients') as FormArray;
  }

  newIngredient(): FormGroup {
    return this.fb.group({
      unity: [
        '',
        Validators.compose([
          Validators.minLength(1),
          Validators.maxLength(10),
          Validators.pattern(this.unityRegex),
        ]),
      ],
      quantity: [
        null,
        Validators.compose([
          Validators.required,
          Validators.min(0),
          Validators.pattern(this.numberRegex),
        ]),
      ],
      name: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(255),
          Validators.pattern(this.nameRegex),
        ]),
      ],
    });
  }

  addIngredient() {
    this.ingredients.push(this.newIngredient());
  }

  removeIngredient(i: number) {
    this.ingredients.removeAt(i);
  }

  close() {
    this.dialogRef.close();
  }

  onSubmitForm() {
    const formValue = this.foodForm.value;
    const newFood: Food = {
      id: 0,
      price: formValue['price'],
      name: formValue['name'],
      ingredients: [
        {
          unity: formValue['ingredients']['unity'],
          quantity: formValue['ingredients']['quantity'],
          name: formValue['ingredients']['name'],
        },
      ],
    };
    this.dialogRef.close(newFood);
  }
}

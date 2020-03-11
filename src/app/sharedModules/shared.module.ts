import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VregformComponent } from '../pages/accounts/vehicles/register/vregform/vregform.component';
import { IonicModule } from '@ionic/angular';
import { ViewRegformComponent } from '../pages/accounts/vehicles/register/viewDetails/viewDetails.component';

@NgModule({
    imports: [FormsModule, ReactiveFormsModule, CommonModule, IonicModule.forRoot()],
    declarations: [VregformComponent, ViewRegformComponent],
    exports: [VregformComponent, ViewRegformComponent]
})
export class SharedModule {}

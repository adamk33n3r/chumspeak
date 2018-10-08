import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatSliderModule,
} from '@angular/material';

const modules: any[] = [
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatSliderModule,
];

@NgModule({
    imports: modules,
    exports: modules,
})
export class MaterialModule {}

import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatSliderModule,
    MatListModule,
    MatCardModule,
} from '@angular/material';

const modules: any[] = [
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatSliderModule,
    MatListModule,
    MatCardModule,
];

@NgModule({
    imports: modules,
    exports: modules,
})
export class MaterialModule {}

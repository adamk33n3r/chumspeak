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
    MatSidenavModule,
    MatMenuModule,
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
    MatSidenavModule,
    MatMenuModule,
];

@NgModule({
    imports: modules,
    exports: modules,
})
export class MaterialModule {}

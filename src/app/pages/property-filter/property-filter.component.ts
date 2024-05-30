import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../shared/shared.module";

@Component({
    selector: 'app-property-filter',
    standalone: true,
    templateUrl: './property-filter.component.html',
    styleUrl: './property-filter.component.scss',
    imports: [CommonModule, SharedModule]
})
export class PropertyFilterComponent {

}

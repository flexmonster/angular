import { Component, Inject, Input, inject } from '@angular/core';

//Example of using Flexmonster reference passed from parent component
@Component({
    selector: 'app-toolbar',
    standalone: true,
    template: `
    <div class="toolbar">
      <button class="btn" (click)="openFieldList()">Open Field List</button>
    </div>
  `,
    styles: [`
    .toolbar {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
      padding: 8px;
      background-color: #f5f5f5;
      border-radius: 4px;
    }
    .btn {
      padding: 8px 16px;
      border: 1px solid #ccc;
      background-color: white;
      border-radius: 4px;
      cursor: pointer;
    }
    .btn:hover {
      background-color: #e9e9e9;
    }
  `]
})
export class ToolbarComponent {
    @Input() flexmonster: any; // Direct reference to the component

    openFieldList() {
        this.flexmonster?.flexmonster?.openFieldList();
    }

}
import { Component, CUSTOM_ELEMENTS_SCHEMA, signal, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

//Import Flexmonster Angular module
// import { FlexmonsterModule } from '../../../../dist/flexmonster/angular';

//Import Flexmonster Angular standalone components
import { FlexmonsterComposite, FlexmonsterFlat, FlexmonsterPivot, FlexmonsterToolbar, FlexmonsterFlatFieldList, FlexmonsterPivotFieldList } from '../../../../dist/flexmonster/angular';

//Import Flexmonster styles
import '@flexmonster/flexmonster/flexmonster.css'

//Import Toolbar component
import { ToolbarComponent } from './toolbar/toolbar.component';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet,ToolbarComponent, FlexmonsterComposite, FlexmonsterFlat, FlexmonsterPivot, FlexmonsterToolbar, FlexmonsterFlatFieldList, FlexmonsterPivotFieldList],
    //imports: [RouterOutlet, ToolbarComponent, FlexmonsterModule], // Use module instead of individual components
	templateUrl: './app.html',
	//Allow FM custom elements
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	styleUrl: './app.css'
})
export class App {
	protected readonly title = signal('test-app');
	readonly composite = viewChild.required<FlexmonsterComposite>("flex");
	readonly flatTable = viewChild.required<FlexmonsterFlat>("flat");
	readonly pivotTable = viewChild.required<FlexmonsterPivot>("pivot");
	readonly toolbarPivot = viewChild.required<FlexmonsterToolbar>("toolbarPivot");
	readonly toolbarFlat = viewChild.required<FlexmonsterToolbar>("toolbarFlat");
	readonly fieldListFlat = viewChild.required<FlexmonsterFlatFieldList>("fieldListFlat");
	readonly fieldListPivot = viewChild.required<FlexmonsterPivotFieldList>("fieldListPivot");

	// Method to open the field list - test API calls
	// Example of using Flexmonster reference passed from the same component
	public openFieldListComposite(){
		this.composite().flexmonster.openFieldList();
	}

	public openFieldListFlat(){
		this.toolbarFlat().toolbar.openFieldList();
	}

	public openFieldListPivot(){
		this.toolbarPivot().toolbar.openFieldList();
	}

	public getCellFlat(){
		const cell = this.flatTable().flatTable.getCell(0,0);
		alert(`Value of the first cell: ${cell.value}`);
	}

	public getCellPivot(){
		const cell = this.pivotTable().pivotTable.getCell(0,0);
		alert(`Value of the first cell: ${cell.value}`);
	}

	public setViewType(type: "flat"|"pivot") {
		this.composite().flexmonster.setViewType(type);
	}

	// Test property binding with our toolkit element
	public disabled = true;	

	//#region flexmonster composite
	public optionsFmPivot = {
		viewType: "flat"
	};

	public stateFmFlexmonster =
		{
			"id": "state-0",
			"dataset": {
				"dataSource": {
					"data": [{
						"Year": 2021,
						"Gender": "Male",
						"Name": "Liam",
						"Count": 20000,
						"State": "CA"
					}],
					"type": "json"
				}
			},
			"slice": {
				"rows": [
					{
						"name": "Year"
					},
					{
						"name": "Gender"
					},
					{
						"name": "Name"
					}
				],
				"values": [
					{
						"name": "Count",
						"aggregation": "sum"
					}
				],
				"columns": [
					{
						"name": "State"
					}
				]
			}
		};

	//#region flexmonster flat

	public stateFmFlat =
		{
			"id": "state-1",
			"dataset": {
				"dataSource": {
					"data": [{
						"Year": 2021,
						"Gender": "Male",
						"Name": "Liam",
						"Count": 20000,
						"State": "CA"
					}],
					"type": "json"
				}
			},
		};

	//#region flexmonster pivot

	public stateFmPivot =
		{
			"id": "state-2",
			"dataset": {
				"dataSource": {
					"data": [{
						"Year": 2021,
						"Gender": "Male",
						"Name": "Liam",
						"Count": 20000,
						"State": "CA"
					}],
					"type": "json"
				}
			},
			"slice": {
				"rows": [
					{
						"name": "Year"
					},
					{
						"name": "Gender"
					},
					{
						"name": "Name"
					}
				],
				"values": [
					{
						"name": "Count",
						"aggregation": "sum"
					}
				],
				"columns": [
					{
						"name": "State"
					}
				]
			}
		};
}

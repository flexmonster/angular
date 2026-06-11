import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, signal, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

//Import Flexmonster Angular SSR components
import { FMFlexmonster, FMFlatFieldList, FMFlatTable, FMPivotFieldList, FMPivotTable, FMToolbar, FMGroup } from '@flexmonster/angular/ssr';

//Import Flexmonster Angular CSR components
// import { FMFlexmonster, FMFlatTable, FMPivotTable, FMToolbar, FMFlatFieldList, FMPivotFieldList } from '@flexmonster/angular';


//Import Flexmonster styles
import '@flexmonster/js/flexmonster.css'

//Import Toolbar component
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FMCompositeViewType, IFMFlexmonsterOptionsInputParams, StateInputParams } from '@flexmonster/js';
// import { DataSourceType, F16CompositeViewType } from '@flexmonster/js';

@Component({
	selector: 'app-root',
	imports: [FMFlexmonster, FMFlatFieldList, FMFlatTable, FMPivotFieldList, FMPivotTable, FMToolbar, FMGroup, ToolbarComponent],
	templateUrl: './app.html',
	//Allow FM custom elements
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	styleUrl: './app.css'
})
export class App implements AfterViewInit {
	protected readonly title = signal('test-app');
	readonly composite = viewChild.required<FMFlexmonster>("flex");
	readonly flatTable = viewChild.required<FMFlatTable>("flat");
	readonly pivotTable = viewChild.required<FMPivotTable>("pivot");
	readonly toolbarPivot = viewChild.required<FMToolbar>("toolbarPivot");
	readonly toolbarFlat = viewChild.required<FMToolbar>("toolbarFlat");
	readonly fieldListFlat = viewChild.required<FMFlatFieldList>("fieldListFlat");
	readonly fieldListPivot = viewChild.required<FMPivotFieldList>("fieldListPivot");

	async ngAfterViewInit() {
		await this.composite().loaded;
		try {
			 this.composite().flexmonster.openFieldList();
		} catch (e) {
			console.error('Component not loaded');
		}
	}

	// Method to open the field list - test API calls
	// Example of using Flexmonster reference passed from the same component
	public async openFieldListComposite() {
		await this.composite().flexmonster.openFieldList();
	}

	public openFieldListFlat() {
		this.toolbarFlat().toolbar.openFieldList();
	}

	public openFieldListPivot() {
		this.toolbarPivot().toolbar.openFieldList();
	}

	public getCellFlat() {
		const cell = this.flatTable().flatTable.getCell(0, 0);
		alert(`Value of the first cell: ${cell.value}`);
	}

	public getCellPivot() {
		const cell = this.pivotTable().pivotTable.getCell(0, 0);
		alert(`Value of the first cell: ${cell.value}`);
	}

	public setViewType(type: `${FMCompositeViewType}`) {
		this.composite().flexmonster.setViewType(type as FMCompositeViewType);
	}

	// Test property binding with our toolkit element
	public disabled = true;

	//#region flexmonster composite
	public optionsFmPivot: IFMFlexmonsterOptionsInputParams = {
		viewType: 'pivot',
		flatTable: {},
		pivotTable: {}
	};

	public stateFmFlexmonster: StateInputParams =
		{
			"id": "state-0",
			"dataset": {
				"dataSource": {
					"type": "json",
					"data": [{
						"Year": 2021,
						"Gender": "Male",
						"Name": "Liam",
						"Count": 20000,
						"State": "CA"
					}],
				}
			},
			"slice": {
				"rows": [
					{
						"fieldName": "Year"
					},
					{
						"fieldName": "Gender"
					},
					{
						"fieldName": "Name"
					}
				],
				"values": [
					{
						"fieldName": "Count",
						"aggregation": "sum"
					}
				],
				"columns": [
					{
						"fieldName": "State"
					}
				]
			}
		};

	//#region flexmonster flat

	public stateFmFlat: StateInputParams =
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
					"type": 'json',
				}
			},
		};

	//#region flexmonster pivot

	public stateFmPivot: StateInputParams =
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
						"fieldName": "Year"
					},
					{
						"fieldName": "Gender"
					},
					{
						"fieldName": "Name"
					}
				],
				"values": [
					{
						"fieldName": "Count",
						"aggregation": "sum"
					}
				],
				"columns": [
					{
						"fieldName": "State"
					}
				]
			}
		};

	//#region flexmonster group (shared state)
	// A single state shared by every control inside <ngx-fm-group>.
	// The pivot table and field list below inherit this state and stay in sync.
	public stateGroup: StateInputParams =
		{
			"id": "state-group",
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
						"fieldName": "Year"
					},
					{
						"fieldName": "Gender"
					},
					{
						"fieldName": "Name"
					}
				],
				"values": [
					{
						"fieldName": "Count",
						"aggregation": "sum"
					}
				],
				"columns": [
					{
						"fieldName": "State"
					}
				]
			}
		};
}

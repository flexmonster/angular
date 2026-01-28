import { Component, CUSTOM_ELEMENTS_SCHEMA, signal, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlexmonsterComposite, FlexmonsterFlat, FlexmonsterPivot, FlexmonsterToolbar, FlexmonsterFlatFieldList, FlexmonsterPivotFieldList } from '../../../../dist/flexmonster/angular';
import '@flexmonster/flexmonster/flexmonster.css'

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, FlexmonsterComposite, FlexmonsterFlat, FlexmonsterPivot, FlexmonsterToolbar, FlexmonsterFlatFieldList, FlexmonsterPivotFieldList],
	templateUrl: './app.html',
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	styleUrl: './app.css'
})
export class App {
	protected readonly title = signal('test-app');
	readonly comnposite = viewChild.required<FlexmonsterComposite>("flex");

	// Method to open the field list - test API calls
	public openFieldList(){
		this.comnposite().flexmonster.openFieldList();
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

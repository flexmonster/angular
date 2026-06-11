import { AfterContentInit, Component, ContentChildren, Input, QueryList } from '@angular/core';
import type { StateInputParams } from '@flexmonster/js';
import { FMFlexmonster } from './flexmonster.component';
import { FMPivotTable } from './pivot-table.component';
import { FMPivotFieldList } from './pivot-field-list.component';
import { FMFlatTable } from './flat-table.component';
import { FMFlatFieldList } from './flat-field-list.component';
import { FMToolbar } from './toolbar.component';
import { FMFilter } from './filter.component';

/** Every Flexmonster control wrapper exposes a `state` input. */
type FMControl = { state: StateInputParams | undefined };

/**
 * `FMGroup` links several Flexmonster controls to one shared state — the
 * Angular equivalent of the React `FMGroup` wrapper.
 *
 * Place the controls you want to keep in sync as **direct children** of
 * `<ngx-fm-group>` and give the group a `state`. The group passes that state
 * into each control child that doesn't already have its own `state` (a
 * child's own `state` always wins). Each child registers and reads the state
 * through the same `@flexmonster/js` instance that creates its control, so
 * there is no registry mismatch and the library's `<fm-group>` custom element
 * is not needed. Controls that share the same `state.id` are linked by the
 * library and stay in sync.
 *
 * React clones each child element to inject the `state` prop; Angular cannot
 * clone projected content, so the group instead grabs its control children
 * via `@ContentChildren` and sets their `state` input directly. The result is
 * the same: a thin wrapper that propagates one state to its children, leaving
 * the control components untouched.
 *
 * The group renders its children unchanged (just `<ng-content>` — no extra
 * wrapper element). Only direct children are handled.
 *
 * @example
 * <ngx-fm-group [state]="state">
 *   <ngx-fm-pivot-table></ngx-fm-pivot-table>
 *   <ngx-fm-pivot-field-list></ngx-fm-pivot-field-list>
 * </ngx-fm-group>
 */
@Component({
  selector: 'ngx-fm-group',
  standalone: true,
  template: '<ng-content></ng-content>',
})
export class FMGroup implements AfterContentInit {
  @Input() state: StateInputParams | undefined;

  @ContentChildren(FMFlexmonster) private composites!: QueryList<FMControl>;
  @ContentChildren(FMPivotTable) private pivotTables!: QueryList<FMControl>;
  @ContentChildren(FMPivotFieldList) private pivotFieldLists!: QueryList<FMControl>;
  @ContentChildren(FMFlatTable) private flatTables!: QueryList<FMControl>;
  @ContentChildren(FMFlatFieldList) private flatFieldLists!: QueryList<FMControl>;
  @ContentChildren(FMToolbar) private toolbars!: QueryList<FMControl>;
  @ContentChildren(FMFilter) private filters!: QueryList<FMControl>;

  ngAfterContentInit(): void {
    const controls: FMControl[] = [
      ...this.composites,
      ...this.pivotTables,
      ...this.pivotFieldLists,
      ...this.flatTables,
      ...this.flatFieldLists,
      ...this.toolbars,
      ...this.filters,
    ];
    // A child's own state wins; otherwise inject the group's state.
    for (const control of controls) {
      if (control.state === undefined) {
        control.state = this.state;
      }
    }
  }
}

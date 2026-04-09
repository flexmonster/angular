import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { FlatTable, type IFMFlatTable, type IFMFlatTableOptionsInputParams, type StateInputParams } from '@flexmonster/flexmonster';

@Component({
  selector: 'fm-flat-table',
  standalone: true,
  template: '<div style="width:100%;height:100%;"><div class="fm-ng-wrapper"></div></div>',
})
export class FMFlatTable implements AfterViewInit {
  @Input() state: StateInputParams | undefined;
  @Input() options: IFMFlatTableOptionsInputParams | undefined;

  protected root: HTMLElement;
  public flatTable!: IFMFlatTable;

  constructor(el: ElementRef) {
    this.root = el.nativeElement;
  }

  ngAfterViewInit() {
    const container = this.root.getElementsByClassName('fm-ng-wrapper')[0] as HTMLElement;
    this.flatTable = FlatTable(container, { state: this.state, options: this.options });
  }

  ngOnDestroy() {
    if (this.flatTable) {
      this.flatTable.dispose();
    }
  }
}

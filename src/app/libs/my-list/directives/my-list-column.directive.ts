import {
  OnInit,
  Directive,
  Input,
  ViewChild,
  TemplateRef,
  AfterViewInit,
  ElementRef, ContentChild
} from '@angular/core';
import { MyListCellDirective } from './my-list-cell.directive';

@Directive({
  selector: 'my-list-column',
})
export class MyListColumnDirective implements OnInit, AfterViewInit {

  @ContentChild(MyListCellDirective, { read: ElementRef })
  public content;

  @Input()
  public name: string;

  @Input()
  public title: string;

  constructor() { }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    debugger;
    console.log(this.content);
  }

}

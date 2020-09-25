import { OnInit, Directive, Input } from '@angular/core';

@Directive({
  selector: 'my-list-column',
})
export class MyListColumnDirective implements OnInit {

  @Input()
  public name: string;

  @Input()
  public title: string;

  constructor() { }

  public ngOnInit(): void {
  }

}

import { Directive, TemplateRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[my-list-cell]',
})
export class MyListCellDirective implements AfterViewInit{

  constructor(public templateRef: TemplateRef<any>) { }

  public ngAfterViewInit(): void {
    debugger;

    console.log(this.templateRef);
  }

}

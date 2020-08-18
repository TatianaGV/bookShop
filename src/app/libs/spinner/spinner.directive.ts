import {
  Directive,
  OnInit,
  ComponentFactory,
  Input,
  ViewContainerRef, TemplateRef, ComponentFactoryResolver
} from '@angular/core';

import { SpinnerComponent } from './spinner/spinner.component';

@Directive({
  selector: '[appSpinner]',
})
export class SpinnerDirective implements OnInit {

  public componentFactory: ComponentFactory<SpinnerComponent>;

  @Input('appSpinner')
  set showSpinner(spinning: boolean) {
    this.container.clear();

    if (!spinning) {
      this.container.createComponent(this.componentFactory);
    } else {
      this.container.createEmbeddedView(this.template);
    }
  }

  constructor(private container: ViewContainerRef,
              private template: TemplateRef<any>,
              private componentFactoryResolver: ComponentFactoryResolver,
  ) {
    this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(SpinnerComponent);
  }

  public ngOnInit(): void {}

}

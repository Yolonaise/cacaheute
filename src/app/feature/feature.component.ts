import {
  Component,
  OnInit,
  ViewContainerRef,
  ViewChild,
  ComponentFactoryResolver,
  ComponentFactory,
  ComponentRef,
  OnDestroy
} from '@angular/core';
import { MainTasksComponent } from '../main-tasks/main-tasks.component';
import { ActionService } from 'src/service/action.service';

@Component({
  selector: 'app-feature',
  template: `
    <template #featureContainer></template>
  `,
})
export class FeatureComponent implements OnInit, OnDestroy {
  @ViewChild('featureContainer', { read: ViewContainerRef, static: true }) container;
  taskRef: ComponentRef<MainTasksComponent>;

  constructor(
    private action: ActionService,
    private resolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    this.action.registerContainer(this);
  }

  ngOnDestroy() {
    this.taskRef.destroy();
  }

  showTasks() {
    this.container.clear();
    if (this.taskRef) {
      this.taskRef.destroy();
    }

    const factory: ComponentFactory<MainTasksComponent> = this.resolver.resolveComponentFactory(MainTasksComponent);
    this.taskRef = this.container.createComponent(factory);
  }

}

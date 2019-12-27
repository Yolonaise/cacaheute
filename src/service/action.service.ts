import { ViewContainerRef, ComponentFactoryResolver, Injector, EmbeddedViewRef, ComponentRef, Injectable } from '@angular/core';
import { MainTasksComponent } from 'src/app/main-tasks/main-tasks.component';
import { FeatureComponent } from 'src/app/feature/feature.component';
import { AppComponent } from 'src/app/app.component';

@Injectable()
export class ActionService {
    container: FeatureComponent;
    menuContainer: AppComponent;

    constructor() { }

    registerMenu(component: AppComponent) {
        this.menuContainer = component;
    }

    registerContainer(component: FeatureComponent) {
        console.log(component);
        this.container = component;
    }

    showTasks() {
        this.container.showTasks();
        this.menuContainer.showFeature();
    }
}

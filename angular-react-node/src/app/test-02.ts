/**
 * Update the following components to meet the requirements : 
 * * Bind `field` of [textfield] component to its text input
 * * Pass value of `field` from [textfield] component to [title] property of component [ng-app]
 */
import { Component, NgModule , EventEmitter, Output  } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
    selector : 'textfield',
    template : '<input type="text" value="" (keyup)="textChange($event)"/>'
})
export class TextField {
    field = "";
    @Output() changeFromInput : EventEmitter<string> = new EventEmitter();

    textChange(event){
        this.changeFromInput.emit(event.target.value)
    }
}

@Component({
    selector : 'child-component',
    template : `<h2>Title:<h2><br/><textfield (changeFromInput)="receiveInputData($event)"></textfield>`
})
export class ChildComponent {
    @Output() outputFromChild : EventEmitter<string> = new EventEmitter();

    receiveInputData(data){
        this.outputFromChild.emit(data);
    }
}


@Component({
    selector : 'ng-app',
    template : `<div>
                    <child-component (outputFromChild) = "receiveChildData($event)"></child-component> <br/>
                    Title is {{title}}
                </div>`
})
export class Test02Component {

    title:string = "";
    receiveChildData(data){
        this.title = data
    }
}

@NgModule({
    imports : [
        CommonModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test02Component
            }
        ])
    ],
    declarations : [Test02Component,ChildComponent,TextField]
})
export class Test02Module {};
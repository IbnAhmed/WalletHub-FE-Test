/**
 * Add 2 input forms in the following component for first name and last name. Once both forms are filled out by the user, and user has clicked out of the fields, then beside it a username should be automatically generated which should be in the following format: [firstname]_[lastname]_[random integer]
 * First name and last name should be lowercased, and then a random integer between 1 and 9 should be added to the end
 * For example: if the inputs are "John" and "DOE" the generated username could be "john_doe_4" or "john_doe_2"
 */
import { Component, NgModule  } from '@angular/core';
import { RouterModule} from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
    selector : 'ng-app',
    template : `
                <h2>Enter your first and last name</h2>
                <div style="display: flex; gap: 10px">
                    <div>
                        <label>First Name</label>
                        <br>
                        <input type="text" name="first_name" (change)="firstNameChange($event)">
                        <br>
                        <br>
                        <label>Last Name</label>
                        <br>
                        <input type="text" name="last_name" (change)="lastNameChange($event)">
                        <br>
                    </div>
                    <div>
                        <label>User Name</label>
                        <br>
                        <b style="color: red;">{{user_name}}</b>
                    </div>
                </div>
                `,
    styles : []
})
export class UserNameComponent {
    first_name: string = ''
    last_name: string = ''
    user_name: string = ''

    firstNameChange(event){
        this.first_name = event.target.value
        this.generate()
    }
    lastNameChange(event){
        this.last_name = event.target.value
        this.generate()
    }

    generate(){
        if(this.first_name && this.last_name){
            this.user_name = this.first_name.toLowerCase().trim() + '_' + this.last_name.toLowerCase().trim() + '_' + this.randomNumber(1,9)
        }
    }

    randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

@NgModule({
    imports : [
        CommonModule,
        RouterModule.forChild([
            {
                path : "",
                component : UserNameComponent
            }
        ])
    ],
    declarations : [UserNameComponent]
})
export class UserNameModule {};
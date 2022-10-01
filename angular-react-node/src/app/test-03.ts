/**
 * Update the following components to meet the requirements : 
 * 
 * * Bind [email] property to input[name="email"]
 * * Bind [password] property to input[name="password"]
 * 
 * Without using angular forms, validate both fields so that :
 * * email is in correct format ( ex: ends with @a.com)
 * * password contains at least one special character, one upper case character, one lower case character, one number and a minium of 8 characters in length
 * * The fields should be validated when trying to submit the form
 * * Prevent the form from doing an actual form submit and instead, after validation pass, turn on the [logged_in] flag
 * 
 * You can add error messages below each field that shows if the field is not valid
 */
import { Component, NgModule  } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector : 'ng-app',
    template : `<form (submit)="formSubmit($event)">
                    <h2>Login</h2>
                    <br/>
                    <input type="email" value="" name="email" [(ngModel)]="email" />
                    <ng-template [ngIf]="validation.email != ''">
                        <br>
                        <span style="color: red">{{validation.email}}</span>
                    </ng-template>
                    <br/>
                    <input type="password" value="" name="password" [(ngModel)]="password" />
                    <ng-template [ngIf]="validation.password != ''">
                        <br>
                        <span style="color: red">{{validation.password}}</span>
                    </ng-template>
                    <br/>
                    <button type="submit">Submit</button>
                    <br/><br/>
                    <div *ngIf="logged_in">Logged In!</div>
                </form>`
})
export class Test03Component {

    email:string = "";
    password:string = "";

    validation = {
        email: '',
        password: ''
    }

    logged_in = false;

    checkValidity(){
        if(!/^\S+@\S+\.\S+$/.test(this.email)){
            this.validation.email = "Email is not valid"
        } else {
            this.validation.email = ""
        }
        if(!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(this.password)){
            this.validation.password = "password contains at least one special character, one upper case character, one lower case character, one number and a minium of 8 characters in length"
        } else {
            this.validation.password = ""
        }

        if(this.validation.email === "" && this.validation.password === ""){
            return true
        }
        return false
    }
    formSubmit(event){
        event.preventDefault()

        if(this.checkValidity()){
            event.target.reset()
            this.logged_in = true
        }
    }
}

@NgModule({
    imports : [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test03Component
            }
        ])
    ],
    declarations : [Test03Component]
})
export class Test03Module {};
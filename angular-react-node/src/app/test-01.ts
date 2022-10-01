/**
 * In the following component, update the code so that when the value of the [loan-amount] is changed:
 * * If it's blank or 0, the values of [monthly_payment] and [late_payment] becomes "N/A",
 * * If it has a value, the value of [monthly_payment] becomes 2% of [loan-ammount] and the value of [late_payment] becomes 5% of [monthly_payment].
 * * Both [monthly_payment] and [late_payment] should print in the template in currency format : $1,234
 */

import { Component, Input,NgModule  } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
    selector : 'ng-app',
    template : `<div>
                    <h2>Loan Details</h2>
                    <ng-template [ngIf]="loan_amount" [ngIfElse]="NA">
                        <b>Monthly Payment:</b> {{monthly_payment | currency:'USD'}} <br/>
                        <b>Late Payment Fee :</b> {{late_payment | currency:'USD'}} <br/>
                    </ng-template>

                    <ng-template #NA>
                        <b>Monthly Payment:</b> N/A <br/>
                        <b>Late Payment Fee :</b> N/A <br/>
                    </ng-template>
                </div>`
})
export class Test01Component {

    loan_amount:number = 210320;
    monthly_payment:number = this.loan_amount * 0.02;
    late_payment = this.monthly_payment * 0.05;
}

@NgModule({
    imports : [
        CommonModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test01Component
            }
        ])
    ],
    declarations : [Test01Component]
})
export class Test01Module {}
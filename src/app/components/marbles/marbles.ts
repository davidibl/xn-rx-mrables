import { Component, OnInit } from '@angular/core';
import {trigger, state, style, transition, animate, keyframes} from '@angular/animations';
import { Observable, timer } from 'rxjs';
import { delay, timeout, delayWhen } from 'rxjs/operators';
import { from, zip, interval, merge } from 'rxjs';
import { Marble } from '../../model/marble';
import { RxjsService } from '../../services/rxjsService';



@Component({
    selector: 'xn-marbles',
    templateUrl: 'marbles.html',
    styleUrls: ['marbles.scss'],
    animations: [
        trigger('comeon', [
          state('show', style({
            opacity: 1
          })),
          state('hide',   style({
            opacity: 0
          })),
          transition('show => hide', animate('10ms ease-out')),
          transition('hide => show', animate('1000ms ease-in')),
          transition('* => show',
            animate('2000ms', keyframes([
                style({transform: 'translateY(0)', offset: 0}),
                style({transform: 'translateY(40px)', offset: 0.33}),
                style({transform: 'translateY(325px)', offset: 0.90}),
                style({opacity: 0, offset: 1.0}),
            ])
            ))
        ])
      ]
})
export class MarblesComponent implements OnInit {

    private marblesDone: Marble[];
    public marblesArray = [];
    public consoleText = '';

    public constructor(private rxjsService: RxjsService) {}

    public ngOnInit() {
        this.marblesDone = [];
        this.rxjsService
            .getItems()
            .subscribe(items => {
                zip(merge(...items), interval(1000))
                    .subscribe(([marble, i]) => this.marblesArray.push(marble));
                items.forEach(obs => {

                });
            });
    }

    public animationEnd(element: Marble) {
        if (this.marblesDone.indexOf(element) > -1) {
            return;
        }
        this.marblesDone.push(element);
        element.hidden = true;
        this.consoleText = this.consoleText + element.text + '\n';
    }
}

import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, of, from, timer } from 'rxjs';
import { delay, shareReplay, switchMap, delayWhen } from 'rxjs/operators';
import { Marble } from '../model/marble';

@Injectable()
export class RxjsService {

    private item = new ReplaySubject<Observable<any>[]>(1);

    public constructor() {
        of(null).pipe( delay(2000) ).subscribe(val => this.init());
    }

    public getItems() {
        return this.item;
    }

    private init() {
        const marbles = [new Marble(1), new Marble(2, 5000), new Marble(3, 10000)];
        const marbles2 = [new Marble('a', 1000), new Marble('b', 500), new Marble('c', 5500)];
        const obs1 = this.getObservableOfArray(marbles);
        const obs2 = this.getObservableOfArray(marbles2);

        const obs3 = of(new Marble(1));
        const observables = [obs1, obs2, obs3];

        this.item.next(observables);
    }

    private getObservableOfArray(marbles: Marble[]) {
        return from(marbles).pipe( delayWhen(marble => timer(marble.delay)) );
    }
}

import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, of, from, timer } from 'rxjs';
import { delay, delayWhen, tap } from 'rxjs/operators';
import { Marble } from '../model/marble';

@Injectable()
export class RxjsService {

    private item = new ReplaySubject<Observable<any>[]>(1);
    private observableCount = 0;

    public constructor() {
        of(null).pipe( delay(2000) ).subscribe(val => this.init());
    }

    public getItems() {
        return this.item;
    }

    private init() {
        const obs1 = this.createNumberMarbles(0, 5000, 10000);
        const obs2 = this.createCharMarbles(1000,  500, 5500);

        const obs3 = of(new Marble(1));
        const observables = [obs1, obs2, obs3];

        this.item.next(observables);
    }

    private createNumberMarbles(delay1 = 0, delay2 = 1, delay3 = 2, ...marbles: Marble[]) {
        return this.getObservableOfArray(
            [new Marble(1, delay1), new Marble(2, delay2), new Marble(3, delay3), ...marbles]);
    }

    private createCharMarbles(delay1 = 0, delay2 = 1, delay3 = 2, ...marbles: Marble[]) {
        return this.getObservableOfArray(
            [new Marble('a', delay1), new Marble('b', delay2), new Marble('c', delay3), ...marbles]);
    }

    private getObservableOfArray(marbles: Marble[]) {
        this.observableCount += 1;
        marbles.forEach(marble => marble.observableId = this.observableCount);
        return from(marbles)
            .pipe(
                delayWhen(marble => timer(marble.delay))
            );
    }
}

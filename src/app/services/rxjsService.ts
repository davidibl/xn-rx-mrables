import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, of, from, timer, merge, combineLatest, concat } from 'rxjs';
import { delay, delayWhen, map, takeWhile, distinctUntilChanged, pairwise, repeat, take } from 'rxjs/operators';
import { Marble } from '../model/marble';

@Injectable()
export class RxjsService {

    private item = new ReplaySubject<Observable<any>[]>(1);
    private observableCount = 0;

    public constructor() {
        of(null).pipe( delay(2000) ).subscribe(val => this.init6());
    }

    public getItems() {
        return this.item;
    }

    private init() {
        const obs1 = this.createNumberMarbles(0, 5000, 10000);
        const obs2 = this.createCharMarbles(1000,  500, 5500);

        const obs3 = merge(obs1, obs2).pipe(
            map(x => {
                const f = new Marble(x.text, 0);
                f.observableId = 3;
                return f;
            }));
        const observables = [obs1, obs2, obs3];

        this.item.next(observables);
    }

    private init2() {
        const obs1 = this.createNumberMarbles(0, 5000, 10000);
        const obs2 = this.createCharMarbles(1000,  500, 5500);

        const obs3 = combineLatest(obs1, obs2, (a, b) => {
                const f = new Marble(a.text + b.text, 0);
                f.observableId = 3;
                return f;
            });
        const observables = [obs1, obs2, obs3];

        this.item.next(observables);
    }

    private init3() {
        const obs1 = this.createNumberMarbles(0, 2000, 4000);
        const obs2 = this.createCharMarbles(7000,  7000, 7000);

        const obs3 = obs1.pipe(
            takeWhile(m => m.text === 1));
        const observables = [obs3];

        this.item.next(observables);
    }

    private init4() {
        const obs1 = this.createNumberMarbles(0, 2000, 4000, new Marble(1, 100), new Marble(1, 7000), new Marble(2, 6000));
        const obs2 = this.createCharMarbles(7000,  7000, 7000);

        const obs3 = obs1.pipe(
            distinctUntilChanged((m, n) => m.text === n.text),
            map(m => {
                const f = new Marble(m.text, 0);
                f.observableId = 3;
                return f;
            })
        );
        const observables = [obs1, obs3];

        this.item.next(observables);
    }

    private init5() {
        const obs1 = this.createNumberMarbles(0, 2000, 4000, new Marble(1, 100), new Marble(1, 7000), new Marble(2, 6000));
        const obs2 = this.createCharMarbles(7000,  7000, 7000);

        const obs3 = obs1.pipe(
            pairwise(),
            map(([m, n]) => {
                const f = new Marble(m.text + '' + n.text, 0);
                f.observableId = 3;
                return f;
            })
        );
        const observables = [obs1, obs3];

        this.item.next(observables);
    }

    private init6() {
        const obs1 = this.createNumberMarbles(0, 2000, 4000, new Marble(1, 100), new Marble(1, 7000), new Marble(2, 6000));
        const obs2 = this.createCharMarbles(7000,  7000, 7000);

        const obs3 = obs1.pipe(
            repeat(3),
            map(m => {
                const f = new Marble(m.text, 0);
                f.observableId = 3;
                return f;
            }),
        );
        const observables = [obs1, obs3];

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

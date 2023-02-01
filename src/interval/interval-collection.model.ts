import { originalClearInterval, originalSetInterval } from '../overrides/override.ts'
import { Interval } from './interval.model.ts';

export class IntervalCollection {
	private _intervalCollection: Interval[] = [];

	public add(handler: any, interval?: any, ...args: any[]) {
		let id = originalSetInterval.apply(window, [handler, interval, args]);
		this._intervalCollection.push({id, handler, interval, arguments: args, timestamp: Date.now()});

		return id;
	}

	public remove(id: number): void {
		let intervalIndex = this._getIntervalIndexById(id);

		if (intervalIndex !== -1) {
			this._intervalCollection.splice(intervalIndex, 1);
		}

		originalClearInterval.apply(window, [id]);
	}

	public get(index: number): Interval {
		return this._intervalCollection[index];
	}

	public getAll(): Interval[] {
		return this._intervalCollection;
	}

	public getById(id: number): Interval {
		return this._intervalCollection[this._getIntervalIndexById(id)];
	}

	public removeAll() {
		this._intervalCollection.forEach((interval: Interval) => {
			originalClearInterval.apply(window, [interval.id]);
		});

		this._intervalCollection = [];
	}

	private _getIntervalIndexById(intervalId: number): number {
		for (let i = 0; i < this._intervalCollection.length; i++) {
			if (this._intervalCollection[i].id === intervalId) {
				return i;
			}
		}

		return -1;
	}
}

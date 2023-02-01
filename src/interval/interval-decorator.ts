import { IntervalCollection } from './interval-collection.model.ts';

export var intervalCollection = new IntervalCollection();

window.setInterval = (handler: any, interval?: any, ...args: any[]): number => {
	return intervalCollection.add(() => {
		handler();
	}, interval, args);
};

window.clearInterval = function (id?: number): void {
	if (id) {intervalCollection.remove(id);}
};
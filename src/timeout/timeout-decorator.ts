import { TimeoutCollection } from './timeout-collection.model.ts';

export var timeoutCollection = new TimeoutCollection();

window.setTimeout = (handler: any, timeout?: any, ...args: any[]): number => {
	return timeoutCollection.add(handler, timeout, args);
};

window.clearTimeout = function (id?: number): void {
	if (id) {
	timeoutCollection.remove(id);
	}
};
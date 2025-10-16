export const localStorageHelper = {
	getItem<T>(key: string, defaultValue: T): T {
		try {
			const item = localStorage.getItem(key);
			return item ? JSON.parse(item) : defaultValue;
		} catch (error) {
			console.warn(`Failed to parse localStorage item "${key}":`, error);
			return defaultValue;
		}
	},

	setItem<T>(key: string, value: T): void {
		try {
			localStorage.setItem(key, JSON.stringify(value));
		} catch (error) {
			console.error(`Failed to set localStorage item "${key}":`, error);
		}
	},

	removeItem(key: string): void {
		try {
			localStorage.removeItem(key);
		} catch (error) {
			console.error(`Failed to remove localStorage item "${key}":`, error);
		}
	},
};

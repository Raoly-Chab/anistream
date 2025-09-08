import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (e) {
			console.error("Storage error (get):", e);
			return initialValue;
		}
	});

	useEffect(() => {
		try {
			window.localStorage.setItem(key, JSON.stringify(storedValue));
		} catch (e) {
			console.error("Storage error (set):", e);
		}
	}, [key, storedValue]);

	return [storedValue, setStoredValue];
}

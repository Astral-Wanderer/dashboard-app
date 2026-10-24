import { useState } from 'react'; // damit unser Hook Wert speicher und bei Änderungen aktualisieren kann

// custom hook definieren
export function useLocalStorage<T>(key: string, defaultValue: T) {
    const [value, setValue] = useState<T>(() => {
        try {
            const stored = localStorage.getItem(key);
            return stored !== null ? (JSON.parse(stored) as T) : defaultValue;
        } catch {
            return defaultValue;
        }
    });

    function set (newValue: T) {
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
    }
    return [value, set] as const;
}
export enum Keys {
    ENTER = 'Enter',
    ESC = 'Esc',
}

const listeners = new Map<string, (event: KeyboardEvent) => void>();

export const listenKeyboard = (key: Keys, func: () => void) => {
    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === key) func();
    };

    if (listeners.has(key)) {
        window.removeEventListener('keydown', listeners.get(key)!);
    }

    listeners.set(key, handleKeyPress);

    window.addEventListener('keydown', handleKeyPress);

    return () => {
        console.log('Listener removed');

        window.removeEventListener('keydown', handleKeyPress);

        listeners.delete(key);
    };
};

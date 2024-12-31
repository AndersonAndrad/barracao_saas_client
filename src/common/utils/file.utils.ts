import {toast} from "sonner";

export const readFile = (file: File): Promise<string | ArrayBuffer | null> | undefined => {
    const reader = new FileReader();

    if (!file || typeof file !== 'string') return;

    return new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsDataURL(file);
    });
};

/**
 * Check if the size is too large
 * @param file
 * @param maximumSize default 10MB
 */
export const fileSizeInvalid = (file: File, maximumSize: number = 10): boolean => {
    const fileSizeInMB: number = file.size / 1024 / 1024

    const fileIsTooBigger: boolean = fileSizeInMB > maximumSize;

    if (fileIsTooBigger) toast(`Arquivo maior que ${maximumSize}MB por favor, escolha um arquivo menor.`);

    return fileIsTooBigger
}
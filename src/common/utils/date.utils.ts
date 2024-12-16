export const formatDate = (date: Date): string => {
    if (!date) return '-';

    if (!(date instanceof Date)) return '-';

    const dateFormatted: string = date.toLocaleDateString('pt-BR', {day: 'numeric', month: 'long', year: 'numeric'});

    return `${dateFormatted} 🎂`;
}
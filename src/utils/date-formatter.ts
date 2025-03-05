export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2-digit day
    const month = date.toLocaleString('default', { month: 'short' }); // Get short month name (e.g., Oct)
    const year = date.getFullYear(); // Get full year

    return `${day}-${month}-${year}`;
};
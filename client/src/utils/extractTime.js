export function extractTime(dateString) {
    const date = new Date(dateString);
    const hours = addLeadingZero(date.getHours());
    const minutes = addLeadingZero(date.getMinutes());
    return `${hours}:${minutes}`;
}

function addLeadingZero(number) {
    return number.toString().padStart(2, '0');
}

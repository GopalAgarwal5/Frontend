export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    const date = new Date(dateString).toLocaleDateString('en-US', options);
    const [month, day, year] = date.split(' ');
    return `${month}-${day.replace(',', '')}, ${year}`; 
};
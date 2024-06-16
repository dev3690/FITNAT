
export const formatDateYYMMDD = () =>{
    const isoDate = "2024-08-05T00:00:00.000Z";
    const date = new Date(isoDate);
    
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getUTCDate()).padStart(2, '0');
    
    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate);
    return formattedDate
}


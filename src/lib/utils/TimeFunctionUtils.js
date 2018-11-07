export const generateHours = () => {
    let hours = [];
    for(let i = 0; i < 24; i++){
        hours.push(i);
    }
    return hours;
}

export const generateMinutes = () => {
    let minutes = [];
    for(let i = 0; i < 60; i++){
        if(i < 10){
            minutes.push("0" + i.toString());  
        }else{
            minutes.push(i.toString());
        }
    }
    return minutes;
}
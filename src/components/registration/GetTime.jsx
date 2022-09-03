import React from 'react'


   export const getTimeInMinute = () =>{
         // Calculate milliseconds in a year
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const year = day * 365;

    // Divide Time with a year
    const d = new Date();
    let total_minutes = Math.round(d.getTime() / minute);
    return total_minutes
    }
  



export const MILLISECOND_PER_DAYS=1000*60*60*24

export const dayDifferance=(date1:Date,date2:Date)=>{
    const TIME_DIFF=Math.abs(date2.getTime() -date1.getTime())
    const days=Math.ceil(TIME_DIFF/(MILLISECOND_PER_DAYS))
    return days
}
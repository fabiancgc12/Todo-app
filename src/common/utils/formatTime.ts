const timeFormatter = new Intl.DateTimeFormat("en-US",{
    timeStyle: "medium"
})

export function timeFormat(date:Date){
    return timeFormatter.format(date)
}

const timeFormatter = new Intl.DateTimeFormat("en-US",{
    timeStyle: "short"
})

export function timeFormat(date:Date){
    return timeFormatter.format(date)
}

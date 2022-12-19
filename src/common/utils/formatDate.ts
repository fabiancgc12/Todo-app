const dateFormatter = new Intl.DateTimeFormat("en-US",{
    dateStyle: "short"
})

export function dateFormat(date:Date){
    return dateFormatter.format(date)
}

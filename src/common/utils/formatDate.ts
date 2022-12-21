const dateFormatter = new Intl.DateTimeFormat("en-US",{
    dateStyle: "medium"
})

export function dateFormat(date:Date){
    return dateFormatter.format(date)
}

export const htmlDecode = (input, full = true) => {
    var doc = new DOMParser().parseFromString(input, "text/html");
    if (!full) {
        if (doc.documentElement.textContent.length > 13) {
            return doc.documentElement.textContent.substring(0, 13) + '...';
        }
    }
    return doc.documentElement.textContent;
}

export const timeConverter = (input) => {
    var hours = Math.floor(input / 60);          
    var minutes = input % 60;

    return `${hours} Hours ${minutes} Minutes`
}
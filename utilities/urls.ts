export function removeSpecialCharacters(str: string) {
    return str.replace(/[&#,+()$~%'.":!*?<>{}]/g, "");
}

export function convertTitleToURLSafe(title?: string) {
    if (!title) {
        return ""
    }
    const s = removeSpecialCharacters(title);
    return s.replace(/\s+/g, "-").toLowerCase();
}

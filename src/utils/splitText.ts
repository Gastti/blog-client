export const splitText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    const splitedText = text.substring(0, maxLength);
    const matchClosedTag = splitedText.match(/<\s*\/\s*[^>]*\s*>$/);

    if (matchClosedTag) {
      const closedTagIndex = matchClosedTag.index;
      if (closedTagIndex !== undefined) {
        return splitedText.substring(0, closedTagIndex + matchClosedTag[0].length);
      }
    } else {
      return splitedText;
    }
  } else {
    return text;
  }
}
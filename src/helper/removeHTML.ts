
function removeHTML(str: string) {
  return str.replace(/<[^>]*>?/gm, "");
}

export { removeHTML };

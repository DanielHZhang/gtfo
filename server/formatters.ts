
export function removeSlashRN(unformatted: string) {
  return unformatted.replace(/\\r/g, '').replace(/\\n/g, '');
}

export function removeSpanTag(unformatted: string) {
  return unformatted.replace(/<span>/g, '').replace(/<\/span>/g, '');
}

export function removeExtraWhitespace(unformatted: string) {
  return unformatted.replace(/ +/g, ' ').trim();
}

export function formatRent(unformatted: string) {
  return pipe(unformatted, [removeSlashRN, removeSpanTag, removeExtraWhitespace]);
}

function pipe(original: string, fns: Function[]) {
  return fns.reduce<string>((accumulator, func) => func(accumulator), original);
}

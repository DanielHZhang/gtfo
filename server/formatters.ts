function pipe(original: string, fns: Function[]) {
  return fns.reduce<string>((accumulator, func) => func(accumulator), original);
}

export function removeSlashRN(unformatted: string) {
  return unformatted.replace(/\\r/g, '').replace(/\\n/g, '');
}

export function removeSpanTag(unformatted: string) {
  return unformatted.replace(/<span>/g, '').replace(/<\/span>/g, '');
}

export function removeExtraWhitespace(unformatted: string) {
  return unformatted.replace(/ +/g, ' ').trim();
}

export function replaceCodes(unformatted: string) {
  return unformatted.replace(/&#xA;/g, '').replace(/&#xD;/g, '\n').replace(/&#x2B;/g, '+');
}

export function format(unformatted: string) {
  return pipe(unformatted, [removeSlashRN, removeSpanTag, replaceCodes, removeExtraWhitespace]);
}

export function formatLease(unformatted: string) {
  const removed = format(unformatted);
  const final = {
    term: 0,
    negotiable: false,
  };
  if (removed.includes('(Negotiable)')) {
    final.negotiable = true;
  }
  final.term = parseInt(removed.match(/\d+/)[0], 10);
  return final;
}

export function formatRent(unformatted: string, rooms: number) {
  const formatted = format(unformatted);
  const final = {
    raw: formatted,
    value: 0,
  };
  const perBed = parseInt(formatted.match(/\d+/)[0], 10);
  if (formatted.includes('per bdrm')) {
    final.value = perBed;
  } else {
    final.value = perBed / rooms;
  }
  return final;
}

export function formatAvailable(unformatted: string) {
  return format(unformatted.replace('Available', ''));
}

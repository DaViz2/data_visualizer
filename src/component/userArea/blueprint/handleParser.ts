export function handleStringify(nodeName: string, functionSpace: string) {
  return `${nodeName}:${functionSpace}`;
}

export function handleParse(mergedString: string) {
  const arr = mergedString.split(':');
  return { nodeName: arr[0], functionSpace: arr[1] };
}

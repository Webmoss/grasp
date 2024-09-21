export const prettyName = (name: any) => {
  let i = 0;
  const frags = name.split('_');
  for (i = 0; i < frags.length; i++) {
     frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags.join(' ');
}


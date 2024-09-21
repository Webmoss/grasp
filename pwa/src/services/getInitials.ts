export const getInitials = (name: string) => {
  const names = name.trim().split(' ');
  const initials = names.reduce((acc, curr, index) => {
    if (index === 0 || index === names.length - 1) {
      acc = `${acc}${curr.charAt(0).toUpperCase()}`;
    }
    return acc;
  }, '');
  return initials;
};

const nextElementInList = <T>(list: T[], currentElement: T): T => {
  const currentElementIndex = list.indexOf(currentElement);
  // to ensure that the next action index is always between 0 and 3
  const nextElementIndex = (currentElementIndex + 1) % list.length;
  const nextValue = list[nextElementIndex];
  return nextValue;
};

export default nextElementInList;

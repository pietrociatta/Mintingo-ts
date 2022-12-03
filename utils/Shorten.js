export const shorten = (address) =>
  `${address.slice(2, 4)}...${address.slice(address.length - 3)}`;

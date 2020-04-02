function hash(): Number {
  const id = Math.round(Math.random() * 10000);
  if (id < 1000) {
    return hash();
  } else {
    return id;
  }
}

export { hash };

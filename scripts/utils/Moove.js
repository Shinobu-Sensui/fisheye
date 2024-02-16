export default class Moove {
  constructor(data) {
    this.index = 0;
    this.maxIndex = data.length - 1;
    this.data = data;
  }
  switch() {
    if (this.index <= this.maxIndex) {
      ++this.index;
      if (this.index === this.maxIndex) {
        this.index = 0;
      }
      return this.data[this.index];
    }
  }
}

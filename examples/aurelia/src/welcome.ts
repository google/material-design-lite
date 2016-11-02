export class Welcome {
  accentButtons = false;
  raisedButtons = false;
  isIndeterminate = false;
  changeEventCount: number = 0;

  handleChange() {
    this.changeEventCount++;
  }

  makeIndeterminate() {
    this.isIndeterminate = true;
  }

  toggleCheckbox() {
    this.raisedButtons = !this.raisedButtons;
  }
}

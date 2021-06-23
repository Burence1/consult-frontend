export class PhoneNumber {
  country: string;
  area: string;
  prefix: string;
  line: string;

  // format phone numbers as E.164
  // tslint:disable-next-line: typedef
  get e164() {
    const num = this.country + this.area + this.prefix + this.line;
    return `+${num}`;
  }

}

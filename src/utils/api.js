let BASE_URL = 'http://apic9logistics.eprocurement.ng/v1';
if (process.env.NODE_ENV === 'development') {
  BASE_URL = `http://apic9logistics.eprocurement.ng/v1`;
}
export default BASE_URL;

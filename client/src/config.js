const production = false;
const domain = production ? "http://doesisaacbeat.me" : "http://192.168.2.116"
const port = ":5000"
const config = {
	uri: {
		domain: production ? domain : domain + port,
	}
}
export default config;
export { config }

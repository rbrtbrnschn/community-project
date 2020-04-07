const production = false;
const domain = production ? "https://doesisaacbeat.me" : ""
const port = production ? ":5000" : ""
const config = {
	uri: {
		domain: production ? domain : domain + port,
	}
}
export default config;
export { config }

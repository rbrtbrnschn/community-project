const nodemailer = require("nodemailer");

async function sendMail(params){
	
	const prodOptions = {
		service: 'gmail',
 		auth: {
        		user: 'doesisaacbeat.me@gmail.com',
        		pass: 'Manfred99'
    		}
	}
	const newOptions = {
		host: 'smtp.gmail.com',
    		port: 465,
    		secure: true, // use SSL
    		auth: {
        		user: 'doesisaacbeat.me@gmail.com',
        		pass: 'Manfred99'
    		}
	}
	const testOptions = {
		host:"smtp.mailtrap.io",
		port:2525,
		auth: {
			user: "cba0d40120f4cc",
			pass: "13f2587ea1fa7c"
		}
	}
	const {to,title,body} = params;
	
	const transporter = nodemailer.createTransport(newOptions);
	let options = {
		from: "TodoHub <doesisaacbeat.me@gmail.com>",
		to: to,
		subject: title,
		html: body
	}

	 await transporter.sendMail(options, (err,info)=>{
	 	if(err)console.log(err)
		else
	 	  console.log("Email Sent -",__dirname);
	 })


}

module.exports = {sendMail:sendMail}

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
	const mailjetOptions = {
		host: 'in-v3.mailjet.com',
		port: 465,
		secure: true,
		auth : {
			user:'5c60b4746c6508c6153c7fffe9885e00',
			pass:'f91111fe5dedf15736ff5c18ea78b2ee'
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
	
	const transporter = nodemailer.createTransport(mailjetOptions);
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

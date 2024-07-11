import nodemail, { getTestMessageUrl } from "nodemailer";
import IMailProvider, { IMailDTO } from "../models/IMailProvider";
import Mail from "nodemailer/lib/mailer";

class EtherealMailProvider implements IMailProvider {
	private transporter;

	constructor() {
		this.transporter = nodemail.createTransport({
			host: "smtp.ethereal.email",
			port: 587,
			auth: {
				user: "jonathan52@ethereal.email",
				pass: "3BMm3mDaBJ6tMnn572",
			},
		});
	}

	async sendMail(data: IMailDTO): Promise<void> {
		const defaultFrom: Mail.Address = {
			name: "Equipe Plann.er",
			address: "no-reply@plann.er",
		};

		const message = await this.transporter.sendMail({
			from: defaultFrom || data.from,
			to: data.to,
			subject: data.subject,
			html: data.html,
		});

		console.log(`Email enviado: ${getTestMessageUrl(message)}`);
	}
}

export default EtherealMailProvider;

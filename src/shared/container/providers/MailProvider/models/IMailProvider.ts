import Mail from "nodemailer/lib/mailer";

export interface IMailDTO {
	from?: Mail.Address;
	to: Mail.Address | Mail.Address["address"];
	subject: string;
	html: string;
}

interface IMailProvider {
	sendMail(data: IMailDTO): Promise<void>;
}

export default IMailProvider;

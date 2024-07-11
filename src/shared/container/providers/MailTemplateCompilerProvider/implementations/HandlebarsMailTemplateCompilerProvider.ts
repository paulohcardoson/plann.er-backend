import Handlebars from "handlebars";
import IMailTemplateCompilerProvider from "../models/IMailTemplateCompilerProvider";

class HandlebarsMailTemplateCompilerProvider // eslint-disable-next-line indent
	implements IMailTemplateCompilerProvider
{
	compile(content: string, vars: unknown): string {
		const template = Handlebars.compile(content);

		return template(vars);
	}
}

export default HandlebarsMailTemplateCompilerProvider;

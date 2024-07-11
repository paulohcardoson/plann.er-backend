import { container } from "tsyringe";
import HandlebarsMailTemplateCompilerProvider from "./implementations/HandlebarsMailTemplateCompilerProvider";
import IMailTemplateCompilerProvider from "./models/IMailTemplateCompilerProvider";

const providers = {
	handlebars: HandlebarsMailTemplateCompilerProvider,
};

container.registerSingleton<IMailTemplateCompilerProvider>(
	"MailTemplateCompilerProvider",
	providers.handlebars,
);

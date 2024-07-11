interface IMailTemplateCompilerProvider {
	compile(content: string, vars: unknown): string;
}

export default IMailTemplateCompilerProvider;

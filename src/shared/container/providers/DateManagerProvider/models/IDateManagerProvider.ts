interface IDateManagerProvider {
	isBefore(startDate: Date, endDate: Date): boolean;
	isAfter(startDate: Date, endDate: Date): boolean;
	format(date: Date, template: string): string;
}

export default IDateManagerProvider;

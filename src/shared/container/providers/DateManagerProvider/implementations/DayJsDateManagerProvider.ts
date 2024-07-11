import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/pt-br";

import IDateManagerProvider from "../models/IDateManagerProvider";

class DayJsDateManagerProvider implements IDateManagerProvider {
	constructor() {
		dayjs.extend(localizedFormat);
		dayjs.locale("pt-br");
	}

	isBefore(startDate: Date, endDate: Date): boolean {
		return dayjs(startDate).isBefore(endDate);
	}

	isAfter(startDate: Date, endDate: Date): boolean {
		return dayjs(startDate).isAfter(endDate);
	}

	format(date: Date, template: string) {
		return dayjs(date).format(template);
	}
}

export default DayJsDateManagerProvider;

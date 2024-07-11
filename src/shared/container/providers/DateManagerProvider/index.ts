import { container } from "tsyringe";

import DayJsDateManagerProvider from "./implementations/DayJsDateManagerProvider";
import IDateManagerProvider from "./models/IDateManagerProvider";

const providers = {
	dayjs: DayJsDateManagerProvider,
};

container.registerSingleton<IDateManagerProvider>(
	"DateManagerProvider",
	providers.dayjs,
);

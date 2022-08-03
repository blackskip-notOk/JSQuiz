import { TimesofDay } from './../constants/index';
import { DateTime } from 'luxon';

export const getGreetingTime = (d = DateTime.now()) => {
	const splitAfternoon = 12;
	const splitEvening = 17;
	const currentHour = parseFloat(d.toFormat('HH'));

	if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
		return TimesofDay.afternoon;
	} else if (currentHour >= splitEvening) {
		return TimesofDay.evening;
	}
	return TimesofDay.morning;
};

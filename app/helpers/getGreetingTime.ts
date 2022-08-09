import { TimesOfDay } from './../constants/index';
import { DateTime } from 'luxon';

export function getGreetingTime(d = DateTime.now()) {
	const splitAfternoon = 12;
	const splitEvening = 17;
	const currentHour = parseFloat(d.toFormat('HH'));

	if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
		return TimesOfDay.afternoon;
	} else if (currentHour >= splitEvening) {
		return TimesOfDay.evening;
	}
	return TimesOfDay.morning;
}

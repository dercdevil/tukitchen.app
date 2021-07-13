export const subMinutes = (dt, minutes) => {
	return new Date(dt.getTime() - minutes * 60000);
};

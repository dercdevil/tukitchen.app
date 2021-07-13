import { Duration } from "luxon";

export const humanizeMinutes = ( timeMinutes ) => {

    const duration = Duration.fromObject({ minutes: timeMinutes }).shiftTo('hours','minutes');
    const { hours, minutes } = duration.toObject();

    return `${ hours > 0 ? `${hours} ${hours === 1 ? "hr" : "hrs"}` : ""} ${ minutes > 0 ? `${minutes} min` : ""}`;

}
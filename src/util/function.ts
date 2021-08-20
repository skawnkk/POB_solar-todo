import moment from "moment";
export const disabledDate = (current) =>
  current && current < moment().endOf("day");

import moment from "moment";

export const getUserRole = (user: any) => {
  return user?.role?.type;
};

export const isProfileCompleted = (user: any) => {
  console.log("user in isProfileCompleted", user);

  return user.completeProfile;
};

export const isEmailVerfied = (user: any) => {
  return user.emailVerified || user.is_mobile_verified;
};

export const verifyToken = (token: string) => {
  return token;
};

export const convertErrorsToArray = (data: any) => {
  const errors = [];
  for (const item in data) {
    errors.push(data[item][0]);
  }

  return errors;
};

export const getTokenFromLocalStorage = async () => {
  try {
    const token = await window.localStorage.getItem("accessToken");
    return token;
  } catch (error) {
    return null;
  }
};

export const appendInputError = (name: string, message: string) => {
  document.querySelector<any>("#error-" + name).innerHTML = message;
};

export const arrayToSentence = (arr: any) => {
  if (!arr) return false;

  const newArray = arr;

  return newArray.join(", ");
};

export const formatTimePeriod = (timePeriod: any) => {
  return `${moment(timePeriod.start, "HH:mm:ss").format("HH:mm")} - ${moment(
    timePeriod.end,
    "HH:mm:ss"
  ).format("HH:mm")}`;
};

export const formatDDMMYYYY = function (date: Date, seperator: string = "/") {
  return moment(date).format(`DD${seperator}MM${seperator}YYYY`);
};

export const formatYYYYMMDD = function (date: Date, seperator: string = "/") {
  return moment(date).format(`YYYY${seperator}MM${seperator}DD`);
};

export const convertApiToStateFormat = (data: any, type: any) => {
  const convertedData: any = [];

  if (type === "descipline") {
    data.forEach((item: any) => {
      convertedData.push({ label: item.name, value: item.id });
    });
  }

  if (type === "subject") {
    data.forEach((item: any) => {
      convertedData.push({ label: item.name, value: item.id });
    });
  }

  if (type === "timezone") {
    data.forEach((item: any) => {
      convertedData.push({ label: item, value: item });
    });
  }

  return convertedData;
};

export const formatDDDD = function (date: Date) {
  return moment(date).format(`dddd`);
};

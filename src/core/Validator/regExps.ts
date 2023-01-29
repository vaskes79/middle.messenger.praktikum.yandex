export const emailRegExp = /^\w+([.-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
export const displayNameRegExp = /^[A-ZА-Я][a-zа-яё]+$/;
export const loginRegExp = /^[a-zA-Z0-9_-]{3,20}$/;
export const passRegExp = /(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,40}/;
export const phoneRegExp = /^\+?[0-9]{10,15}$/;
export const notEmptyRegExp = /\w+\S+/g;

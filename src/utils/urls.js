import { baseURL } from "../configs";

export const getThumbnail = (id) => {
  return `${baseURL}/uploads/blog/${id}`;
};

export const getAvatar = (id) => {
  return `${baseURL}/uploads/avatar/${id}`;
};

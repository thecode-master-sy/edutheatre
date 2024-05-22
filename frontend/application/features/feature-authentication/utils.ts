export const BASE_URL = "eduprod.onrender.com/api/auth";


export function protect(string: string) {
  const specialChars: any = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "/": "&#x2F;",
    "`": "&#x60;",
    "=": "&#x3D;",
  };

  return string.replace(/[&<>"'`=\/]/g, function (char) {
    return specialChars[char];
  });
}

export const patterns = {
  name: /^[A-Za-z\s.'-]+$/,
  email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
  password: /^.{6,30}$/,
  username: /^(?=.*[_a-zA-Z0-9])[_a-zA-Z0-9]{3,30}$/,
};


export function verify(value: string, pattern: RegExp) {
  if (value === "") return false;

  if (!pattern.test(value)) return false;

  return true;
}

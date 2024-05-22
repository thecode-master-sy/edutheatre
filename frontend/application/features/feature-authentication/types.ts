export type UserDetails = {
  email: string;
  password: string;
};

export interface NewUserDetails extends UserDetails {
  name: string;
}

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

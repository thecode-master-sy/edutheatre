import { cookies } from "next/headers";

export const BASE_URL = "https://eduprod.onrender.com/api/auth";

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

export function setCookie(name: string, value: string) {
	cookies().set({
		name,
		value,
		httpOnly: true,
		path: "/",
		maxAge: 24 * 60 * 60 * 30,
	});
}


export function getCookie(name: string) {
	return cookies().get(name)
}

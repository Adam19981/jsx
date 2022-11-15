import request from "./axios.js";

//login
export function login(req) {
	return request({
		url: "/api/login",
		method: "post",
		data: req
	});
}

//用户信息
export function userInfo(req) {
	return request({
		url: "/api/user",
		method: "get",
		params: req
	});
}

//动态路由
export function menu(req) {
	return request({
		url: "/menu/getMenu",
		method: "post",
		data: req
	});
}

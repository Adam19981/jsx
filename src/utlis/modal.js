export function dateFormat(fmt, date) {
	let ret;
	const opt = {
		"Y+": date.getFullYear().toString(), // 年
		"m+": (date.getMonth() + 1).toString(), // 月
		"d+": date.getDate().toString(), // 日
		"H+": date.getHours().toString(), // 时
		"M+": date.getMinutes().toString(), // 分
		"S+": date.getSeconds().toString() // 秒
		// 有其他格式化字符需求可以继续添加，必须转化成字符串
	};
	for (const k in opt) {
		ret = new RegExp("(" + k + ")").exec(fmt);
		if (ret) {
			fmt = fmt.replace(ret[1], ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
		}
	}
	return fmt;
}

import { Message } from "element-ui";

export default {
	/**
	 * pb 双 _list 转化
	 * @param data
	 * @returns {{}|*}
	 */
	jsonUnderlineFromPB(data) {
		if (typeof data !== "object" || !data) return data;
		if (Array.isArray(data)) {
			return data.map(item => this.jsonUnderlineFromPB(item));
		}

		const newData = {};
		for (const key in data) {
			let newKey = key.replace(/([A-Z])/g, (p, m) => `_${m.toLowerCase()}`);
			const value = data[key];
			if (Array.isArray(value)) {
				if (newKey.substr(newKey.length - 5, newKey.length) === "_list") {
					newKey = newKey.substring(0, newKey.length - 5);
				} else if (newKey.substr(newKey.length - 4, newKey.length) === "_map") {
					newKey = newKey.substring(0, newKey.length - 4);
				}
			}
			newData[newKey] = this.jsonUnderlineFromPB(data[key]);
		}
		return newData;
	},
	/**
	 *  按钮松开后失去 焦点
	 * @param ev
	 */
	elBtnBlur(ev) {
		//
		// 判断按钮是点击到文字还是边框上，移开失焦
		if (ev.target.nodeName === "SPAN" || ev.target.nodeName === "I") {
			ev.target.parentNode.blur();
		} else {
			ev.target.blur();
		}
	},
	// 表单重置
	resetForm(e, refName) {
		if (e.$refs[refName]) {
			e.$refs[refName].resetFields();
		}
	},
	/**
	 * 过滤属性为空的参数
	 * @param obj
	 * @returns {{}}
	 */
	filterParams(obj) {
		const _newPar = {};

		for (const key in obj) {
			// 如果对象属性的值不为空，就保存该属性（这里做了限制，如果属性的值为0，保存该属性。如果属性的值全部是空格，属于为空。
			if ((obj[key] || obj[key] === 0 || obj[key] === false) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, "") !== "") {
				// console.log(obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '')

				_newPar[key] = obj[key];
				if (Object.keys(obj[key]).length || Array.isArray(obj[key])) {
					_newPar[key] = this.filterParams(obj[key]);
				}
			}
		}
		return _newPar;
	},
	/**
	 * 匹配数组内的数据
	 * @param opt 数组
	 * @param numeric 接收与数组匹配的的字段参数
	 * @param emptyData 默认输出
	 * @return {string|*}
	 */
	enumerateData(opt, numeric, emptyData) {
		let result;
		opt.forEach(item => {
			if (item.id === numeric) {
				result = item.name;
			}
		});
		if (result) return result;
		if (!emptyData) emptyData = "—";
		return emptyData;
	},
	/**
	 * 获取选中的地区名称和code
	 * @param cityJson 地区json数据
	 * @param selectCity 选中的地区code
	 * @return {*[]}
	 * city_code: {name: '宁波市', code: '330200'}
	 * province_code: {name: '浙江省', code: '330000'}
	 */
	getCityCode(cityJson, selectCity) {
		const provinceCode = selectCity[0];
		const cityCode = selectCity[1];
		const districtCode = selectCity[2];

		let cities = [];
		let districts = [];
		const result = new Map();

		if (provinceCode) {
			cityJson.map(e => {
				// 遍历数据
				if (provinceCode === e.value) {
					result["province_code"] = { name: e.label, code: e.value };
					cities = e.children;
				}
			});
		}
		if (cityCode) {
			cities.map(e => {
				// 遍历数据
				if (cityCode === e.value) {
					result["city_code"] = { name: e.label, code: e.value };
					districts = e.children;
				}
			});
		}
		if (districtCode) {
			districts.map(e => {
				// 遍历数据
				if (districtCode === e.value) {
					result["county_code"] = { name: e.label, code: e.value };
				}
			});
		}
		return result;
	},
	/**
	 * 防抖
	 * @param fun
	 * @param delay
	 * @returns {(function(*): void)|*}
	 */
	debounceFun(fun, delay) {
		let timeout = null;
		return function () {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				fun();
				// fun.apply(this, arguments)
			}, delay);
		};
	},
	/**
	 * 时间戳转化
	 * @param format 时间格式 YYYY-mm-dd HH:MM:SS
	 * @param timestamp 单位：秒
	 * @returns {string|*}
	 */
	getLocalDate(format, timestamp) {
		if (timestamp) {
			return dateFormat(format, new Date(parseInt(timestamp) * 1000));
		}
		return "—";
	},
	getYearFirstLastDay() {
		// 获取当年第一天与最后一天时间戳
		const firstDay = new Date(new Date().toLocaleDateString());
		firstDay.setDate(1);
		firstDay.setMonth(0);
		const lastDay = new Date(new Date().toLocaleDateString());
		lastDay.setFullYear(lastDay.getFullYear() + 1);
		lastDay.setMonth(1); // 切换至下一年的一月
		lastDay.setDate(0); // 0表示上个月的最后一天
		lastDay.setMonth(-1); // -1表示去年的最后一个月
		const start = parseInt(firstDay.getTime() / 1000);
		const end = parseInt((lastDay.getTime() + 24 * 60 * 60 * 1000 - 1) / 1000);
		return {
			start: start,
			end: end
		};
	},
	onDay() {
		// 获取当天的0点与 23点 时间戳
		const startTime = new Date(new Date().toLocaleDateString()).getTime(); // 当天 00.00
		const endTime = new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1; // 当天23:59
		const start = parseInt(startTime / 1000);
		const end = parseInt(endTime / 1000);
		return {
			start: start,
			end: end
		};
	},
	onWeek() {
		// 本周第一天0点与最后一天23点 时间戳
		const now = new Date();
		const nowTime = new Date(new Date().toLocaleDateString()).getTime();
		const day = now.getDay();
		const oneDayTime = 24 * 60 * 60 * 1000;
		const start = nowTime - (day - 1) * oneDayTime; // 本周第一天 00.00时间戳
		const end = nowTime + (7 - day) * oneDayTime + 24 * 60 * 60 * 1000 - 1; // 本周最后一天 23.59时间戳
		const startTime = parseInt(start / 1000);
		const endTime = parseInt(end / 1000);
		return {
			start: startTime,
			end: endTime
		};
	},
	onMouth() {
		// 获取当月第一天与最后一天 0 点时间戳
		const nowDate = new Date();
		const fullYear = nowDate.getFullYear(); // 返回当年的年份
		const month = nowDate.getMonth() + 1; // 返回当月的月份 +1
		const endOfMonth = new Date(fullYear, month, 0).getDate(); // 0表示上个月的最后一天， getDate()获取当天日期，表达当月的最大天数。
		const endDate = new Date(nowDate.setDate(endOfMonth)); // 当月最后一天
		const startDate = new Date(nowDate.setDate(1)); // 当月第一天
		const start = new Date(startDate.toLocaleDateString()).getTime(); // 当月第一天00.00 时间戳
		const end = new Date(endDate.toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1; // 当月最后一天23.59 时间戳
		const startTime = parseInt(start / 1000);
		const endTime = parseInt(end / 1000);
		return {
			start: startTime,
			end: endTime
		};
	},
	/**
	 *
	 * @param buttons 该模块下的按钮列表
	 * @param btn 按钮name
	 * @returns {boolean}
	 */
	dynamicBtn(buttons, btn) {
		// 动态菜单栏
		if (buttons.length) {
			for (let i = 0; i < buttons.length; i++) {
				if (buttons[i].name === btn) {
					return true;
				}
			}
			return false;
		} else {
			return false;
		}
	},
	/**
	 * 复制到剪切板
	 * @param val 复制的值
	 */
	copy(val) {
		// 模拟 输入框
		let cInput = document.createElement("input");
		cInput.value = val;
		document.body.appendChild(cInput);
		cInput.select(); // 选取文本框内容

		// 执行浏览器复制命令
		// 复制命令会将当前选中的内容复制到剪切板中（这里就是创建的input标签）
		// Input要在正常的编辑状态下原生复制方法才会生效

		document.execCommand("copy");

		Message({
			type: "success",
			message: "复制成功"
		});
		// 复制成功后再将构造的标签 移除
		document.body.removeChild(cInput);
	}
};

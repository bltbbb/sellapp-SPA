/**
 * 解析url参数
 * @example ?id=12345&a=b
 * @return Object {id=12345,a=b}
 */

export function parseUrl() {
	let url = window.location.search
	let obj = {}
	let reg = /[?&][^?&]+=[^?&]+/g
	let arr = url.match(reg)
		// ['?id=12345','a=b']
	if (arr) {
		arr.forEach((item) => {
			let temp = item.substr(1).split('=')
			let key = encodeURIComponent(temp[0])
			let val = encodeURIComponent(temp[1])
			obj[key] = val
		})
	}

	return obj
}

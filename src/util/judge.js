import {
    Toast
} from "vant";

const util = {
    // 合并两个对象
    obj: function (val1, val2) {
        let obj = val1;
        Object.keys(obj).forEach(key => {
            if (val2[key]) {
                obj[key] = val2[key]
            }
        })
        return obj;
    },
    // 清空对象的值
    clearObj(val) {
        let data = val;
        for (var key in data) {
            data[key] = '';
        }
        return data;
    },
    // 调用app的方法
    appFun: function (name, val) {
        console.log(`{"name":"${name}","params":{${val}}}`)
        // 截取当前数据到小数点后两位
        let u = navigator.userAgent;
        // 安卓
        let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
        // IOS
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (isAndroid) {
            window.android.jsToOcFunctionTwo(`{"name":"${name}","params":{${val}}}`);
        } else if (isiOS) {
            window.webkit.messageHandlers.jsToOcWithPrams.postMessage(`{"name":"${name}","params":{${val}}}`);
        }
    },
    appPay: function (name, val) {
        console.log(`{"name":"${name}","params":${ val }}`)
        // 截取当前数据到小数点后两位
        let u = navigator.userAgent;
        // 安卓
        let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
        // IOS
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (isAndroid) {
            window.android.jsToOcFunctionTwo(`{"name":"${name}","params":${ val }}`);
        } else if (isiOS) {
            window.webkit.messageHandlers.jsToOcWithPrams.postMessage(`{"name":"${name}","params":${val}}`);
        }
    },
    //    判断机型
    isIos: function () {
        let u = navigator.userAgent;
        // IOS
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (isiOS) {
            return true
        } else {
            return false
        }
    },
    toast: function (val) {
        if (this.isIos()) {
            window.webkit.messageHandlers.toast.postMessage(val);
        } else {
            window.android.toast(val);
        }
    },
    // 检测键盘弹起
    listenKeyboard: function () {
        window.addEventListener("resize", function () {
            if (document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "TEXTAREA") {
                window.setTimeout(function () {
                    document.activeElement.scrollIntoViewIfNeeded();
                }, 0);
            }
        })
    },
    logout() {
        if (this.isIos()) {
            window.webkit.messageHandlers.logout.postMessage(null);
        } else {
            window.android.logout();
        }
    },
    //邀请码 invite 
    invite: function () {
        if (this.isIos()) {
            window.webkit.messageHandlers.invite.postMessage(null);
        } else {
            window.android.invite();
        }
    },
    // 检查数据是否为空
    isNull: function (data) {
        let notNull = data.replace(/(^\s*)|(\s*$)/g, "");
        let nullFlag = true;
        if (!notNull) {
            nullFlag = false;
        } else {
            nullFlag = true;
        }
        return nullFlag;

    },
    // 判断手机号
    isPhone: function (data) {
        let phone = data.replace(/(^\s*)|(\s*$)/g, "");
        let phoneFlag = true;
        if (phone.length != 11) {
            phoneFlag = false;
        } else {
            phoneFlag = true;
        }
        return phoneFlag;
    },


    //获取年份 
    year: function () {
        let mydate = new Date();
        let myddy = mydate.getFullYear(); //返回年份 (0 ~ 11)
        return myddy;
    },
    // 获取月份
    month: function () {
        let mydate = new Date();
        let myddy = mydate.getMonth(); //返回月份 (0 ~ 11)
        return myddy + 1;
    },
    // 获取几号
    date: function () {
        let mydate = new Date();
        let myddy = mydate.getDate(); //返回一个月中的某一天 (1 ~ 31)
        return myddy;
    },
    // 获取周几
    weekDay: function () {
        let mydate = new Date();
        let myddy = mydate.getDay(); //返回一周中的某一天 (0 ~ 6)
        let weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        return {
            'day': weekday[myddy],
            'idnex': myddy
        };

    },
    // 获取小时 
    hours: function () {
        let mydate = new Date();
        let myddy = mydate.getHours(); //返回小时 (0 ~ 23)
        return myddy;
    },
    //根据时间戳时间转换
    formatter: function (timestamp, length = 6, symbol = '-') {
        let date;
        if (timestamp.length == 10) {
            date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        } else {
            date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        }
        let Y = date.getFullYear();
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        let D = date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate();
        let h = date.getHours()< 10 ? '0' + (date.getHours()) : date.getHours();
        let m = date.getMinutes()< 10 ? '0' + (date.getMinutes()) : date.getMinutes();
        let s = date.getSeconds()< 10 ? '0' + (date.getSeconds()) : date.getSeconds();
        if (length == 2) {
            return `${Y}${symbol}${M}`;
        } else if (length == 3) {
            return `${Y}${symbol}${M}${symbol}${D}`;
        } else if (length == 5) {
            return `${Y}${symbol}${M}${symbol}${D} ${h}:${m}`;
        } else {
            return `${Y}${symbol}${M}${symbol}${D} ${h}:${m}:${s}`;
        }

    },
    // 判断身份证
    IdCodeValid: function (code) {
        //身份证号合法性验证  
        //支持15位和18位身份证号  
        //支持地址编码、出生日期、校验位验证  
        let city = {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江 ",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北 ",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏 ",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外 "
        };
        let row = true;
        let msg = "验证成功";

        if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(code)) {
            row = false,
                msg = "身份证号格式错误";
        } else if (!city[code.substr(0, 2)]) {
            row = false,
                msg = "身份证号格式错误";
        } else {
            //18位身份证需要验证最后一位校验位  
            if (code.length == 18) {
                code = code.split('');
                //∑(ai×Wi)(mod 11)  
                //加权因子  
                let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                //校验位  
                let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
                let sum = 0;
                let ai = 0;
                let wi = 0;
                for (let i = 0; i < 17; i++) {
                    ai = code[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                if (parity[sum % 11] != code[17].toUpperCase()) {
                    row = false,
                        msg = "身份证号格式错误";
                }
            }
        }
        if (!row) {
            Toast(msg)
        }
        return row;
    },

}

export default util
//this.util.toast(res);
// this.util.closeH();
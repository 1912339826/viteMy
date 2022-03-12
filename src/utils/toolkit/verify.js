/**
 *  @overview JS 验证
 */
/**
 * @todo 邮箱
 * @param {*} s
 */
export const isEmail = (s) => {
    return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * @todo 手机号码
 * @param {*} s
 */
export const isMobile = (s) => {
    return /^1[0-9]{10}$/.test(s)
}

/**
 * @todo 电话号码
 * @param {*} s
 */
export const isPhone = (s) => {
    return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * @param {*} s
 * @todo URL地址
 */
export const isURL = (s) => {
    return /^http[s]?:\/\/.*/.test(s)
}

/**
 * 判断类型集合
 * @param {*} str 
 * @param {*} type 
 */
export const checkStr = (str, type) => {
    switch (type) {
        case 'phone': //手机号码
            return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
        case 'tel': //座机
            return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
        case 'card': //身份证
            return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
        case 'pwd': //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
            return /^[a-zA-Z]\w{5,17}$/.test(str)
        case 'postal': //邮政编码
            return /[1-9]\d{5}(?!\d)/.test(str);
        case 'QQ': //QQ号
            return /^[1-9][0-9]{4,9}$/.test(str);
        case 'email': //邮箱
            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
        case 'money': //金额(小数点2位)
            return /^\d*(?:\.\d{0,2})?$/.test(str);
        case 'URL': //网址
            return /(http|ftp|https):\/\/[\w\-_]+([\w\-_]+)+([w,@?^=%&:/~#]*[\w?^=%&/~])?/.test(str)
        case 'IP': //IP
            return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
        case 'date': //日期时间
            return /^(\d{4})-(\d{2})-(\d{2}) (\d{2})(?::\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})-(\d{2})-(\d{2})$/.test(str)
        case 'number': //数字
            return /^[0-9]$/.test(str);
        case 'english': //英文
            return /^[a-zA-Z]+$/.test(str);
        case 'chinese': //中文
            return /^[\\u4E00-\\u9FA5]+$/.test(str);
        case 'lower': //小写
            return /^[a-z]+$/.test(str);
        case 'upper': //大写
            return /^[A-Z]+$/.test(str);
        case 'HTML': //HTML标记
            return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
        default:
            return true;
    }
}

/**
 *  @todo 严格的身份证校验
 *  @param {string} num 
 *  @tutorial https://blog.csdn.net/haibo5240/article/details/89022595
 */
export function isCardID(num) {
    //num数据类型为字符串 
    num = num.toUpperCase();
    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
    if (!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num)) {
        return false;
    }
    //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
    //下面分别分析出生日期和校验位
    let len, re;
    len = num.length;
    if (len == 15) {
        re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
        let arrSplit = num.match(re);

        //检查生日日期是否正确
        let dtmBirth = new Date(
            "19" + arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]
        );
        let bCorrectDay;
        bCorrectDay =
            dtmBirth.getYear() == Number(arrSplit[2]) &&
            dtmBirth.getMonth() + 1 == Number(arrSplit[3]) &&
            dtmBirth.getDate() == Number(arrSplit[4]);
        if (!bCorrectDay) {
            return false;
        } else {
            //将15位身份证转成18位
            //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
            let arrInt = new Array(
                7,
                9,
                10,
                5,
                8,
                4,
                2,
                1,
                6,
                3,
                7,
                9,
                10,
                5,
                8,
                4,
                2
            );
            let arrCh = new Array(
                "1",
                "0",
                "X",
                "9",
                "8",
                "7",
                "6",
                "5",
                "4",
                "3",
                "2"
            );
            let nTemp = 0,
                i;
            num = num.substr(0, 6) + "19" + num.substr(6, num.length - 6);
            for (i = 0; i < 17; i++) {
                nTemp += num.substr(i, 1) * arrInt[i];
            }
            num += arrCh[nTemp % 11];
            return true;
        }
    }
    if (len == 18) {
        re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
        let arrSplit = num.match(re);

        //检查生日日期是否正确
        let dtmBirth = new Date(
            arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]
        );
        let bCorrectDay;
        bCorrectDay =
            dtmBirth.getFullYear() == Number(arrSplit[2]) &&
            dtmBirth.getMonth() + 1 == Number(arrSplit[3]) &&
            dtmBirth.getDate() == Number(arrSplit[4]);
        if (!bCorrectDay) {
            return false;
        } else {
            //检验18位身份证的校验码是否正确。
            //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
            let valnum;
            let arrInt = new Array(
                7,
                9,
                10,
                5,
                8,
                4,
                2,
                1,
                6,
                3,
                7,
                9,
                10,
                5,
                8,
                4,
                2
            );
            let arrCh = new Array(
                "1",
                "0",
                "X",
                "9",
                "8",
                "7",
                "6",
                "5",
                "4",
                "3",
                "2"
            );
            let nTemp = 0,
                i;
            for (i = 0; i < 17; i++) {
                nTemp += num.substr(i, 1) * arrInt[i];
            }
            valnum = arrCh[nTemp % 11];
            if (valnum != num.substr(17, 1)) {
                return false;
            }
            return true;
        }
    }
    return false;
}

/**
 *  @todo 护照验证 
 *  @tutorial https://www.jb51.cc/regex/488106.html
 *  @param {string} cardNum
 *  @returns {boolean} true or false
 */
export function isPassport(cardNum) {
    let re1 = /^[\S\n\s]{8,10}$/
    let arrSplit = re1.test(cardNum);
    return arrSplit
}

/**
 * @todo 港澳通行证验证
 * @param {string} cardNum 
 * @tutorial https://www.jb51.cc/regex/488106.html
 * @returns {boolean} true or false
 */
export function isHKMacao(cardNum) {
    let re = /^[\S\n\s]{8,11}$/
    let arrSplit = re.test(cardNum);
    return arrSplit
}

/**
 * @todo 台湾地区身份证校验
 * @param {string} idcard 
 * @returns {boolean} true or false
 */
export function isTaiwan(idcard) {
    if (/^[A-Z][1-2]\d{8}$/.test(idcard)) {
        var area = {
            'A': 10,
            'B': 11,
            'C': 12,
            'D': 13,
            'E': 14,
            'F': 15,
            'G': 16,
            'H': 17,
            'J': 18,
            'K': 19,
            'L': 20,
            'M': 21,
            'N': 22,
            'P': 23,
            'Q': 24,
            'R': 25,
            'S': 26,
            'T': 27,
            'U': 28,
            'V': 29,
            'X': 30,
            'Y': 31,
            'W': 32,
            'Z': 33,
            'I': 34,
            'O': 35
        };
        var idcard_array = new Array();

        idcard_array = idcard.split("");

        var jym = parseInt(area[idcard_array[0]] / 10) + 9 * (area[idcard_array[0]] % 10) + 8 * idcard_array[1] + 7 * idcard_array[2] + 6 * idcard_array[3] + 5 * idcard_array[4] + 4 * idcard_array[5] + 3 * idcard_array[6] + 2 * idcard_array[7] + 1 * idcard_array[8];

        jym = (10 - jym % 10) % 10;

        if (idcard_array[9] == jym) {
            return true;
        }
        return false
    } else {
        let re1 = /^[\S\n\s]{8,18}$/
        let arrSplit = re1.test(idcard);
        //   // return arrSplit
        return arrSplit
    }
}
import type { bannerData, bannerType } from "@/ReadPage";
export const Func = {
    deconstruction: (arr: Array<bannerType>) => {
        const newArr: bannerData[] = []
        arr.forEach((item: bannerType) => {
            if (item.data.length > 1) {
                item.data.forEach((t: bannerData) => {
                    newArr.push(t)
                })
            } else {
                newArr.push(...item.data)
            }
        })
        return newArr
    },
    getDate: (date: string) => {
        const chineseDate: Date = new Date(date)
        const str = `${chineseDate.getFullYear()}年${chineseDate.getMonth() >= 9 ? chineseDate.getMonth() + 1 : '0' + (chineseDate.getMonth() + 1)
            }月${chineseDate.getDate() >= 10 ? chineseDate.getDate() : '0' + chineseDate.getDate()}日`
        return str
    },
    getMonthDay: (date: string) => {
        const chineseDate: Date = new Date(date)
        const str = `${chineseDate.getFullYear()}.${chineseDate.getMonth() >= 9 ? chineseDate.getMonth() + 1 : '0' + (chineseDate.getMonth() + 1)
            }.${chineseDate.getDate() >= 10 ? chineseDate.getDate() : '0' + chineseDate.getDate()}`;
        return str;
    },
    getText: (text: string) => {
        let str = text.replace(new RegExp('<p>', 'g'), '')
        str = str.replace(new RegExp('</p>', 'g'), '<br>')
        return str
    },
    getStyle: () => {
        let style = JSON.parse(localStorage.getItem("lightAndFont") || "")
        return style
    },
    getMin: (number: number) => {
        let str = `${parseInt(`${number / 60}`)}` + ':' + `${(number % 60) < 9 ? '0' + (number % 60) : (number % 60)}`
        return str
    },
    lightHigh: (value: string, text: string) => {
        let str = '<span>' + text.replace(new RegExp(value,'g'),`</span><span style="color:skyblue;">${value}</span><span>`) + '</span>'
        return str
    }
} 

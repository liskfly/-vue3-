import type { bannerData, bannerType } from "@/ReadPage";
export const Func = {
    deconstruction: (arr: Array<bannerType>) => {
        const newArr: bannerData[] = []
        arr.forEach((item: bannerType) => {
            if (item.data.length > 1) {
                item.data.forEach((t: bannerData) => {
                    console.log(t);
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
    }
} 

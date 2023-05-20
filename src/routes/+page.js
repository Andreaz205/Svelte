import axios from "axios"
import moment from "moment"

export async function load() {
    let {data} = await axios.get('https://test.digitalpartnersglobal.com/test/calendar.json')
    let d = new Date()
    let momentDate = moment(d)
    let currentWeekDayNumberAfterSunday = momentDate.weekday()
    let thisWeekMonday = momentDate.clone().add(7 - currentWeekDayNumberAfterSunday, 'days')
    let firstDayInPeriod = thisWeekMonday.clone().subtract(356, 'days')

    const period = {
        start: firstDayInPeriod,
        end: thisWeekMonday,
    };

    let activeWeekId = 0
    let currentMonth = period.start.format("MMMM")
    let weeksData = []
    new Array(period.end.diff(period.start, 'days') + 1).fill(null)
        .map((v, index) => {
            let currentDay = period.start.clone().add(index, 'days')
            let month = currentDay.clone().format('MMMM')
            let currentDayToFetchedDataFormat = currentDay.format('YYYY-MM-DD')
            let fetchedItemDate = data[currentDayToFetchedDataFormat]
            let count = 0
            if (fetchedItemDate) count = fetchedItemDate
            let status = getStatus(count)

            let translatedMonth = translateMonth(month)
            let translatedDayOfWeek  = translateDayOfWeek(currentDay.format('ddd'))

            let monthToDisplay = null
            if (month !== currentMonth) {
                monthToDisplay = translatedMonth
                currentMonth = month
            }

            let dateForLabel = `${translatedDayOfWeek}, ${translatedMonth} ${currentDay.format("DD, YYYY")}`

            if (currentDay.format("ddd") === 'Mon') {
                index !== 0 && activeWeekId++
                weeksData.push(activeWeekId)

                weeksData[activeWeekId] = {elements: [{
                    item: currentDayToFetchedDataFormat,
                    status: status,
                    count: count,
                    month: monthToDisplay,
                    labelBottomData: dateForLabel
                }]}

            } else {
                if  (weeksData[activeWeekId]?.elements) {
                    weeksData[activeWeekId].elements.push({
                        item: currentDayToFetchedDataFormat,
                        status: status,
                        count: count,
                        month: monthToDisplay,
                        labelBottomData: dateForLabel
                    })
                }
            }
        });

    return {weeks: weeksData};
}

const getStatus = (count) => {
    if (count === 0) return 'first'
    if (count >=1 && count <= 9) return 'second'
    if (count >=10 && count <= 19) return 'third'
    if (count >=20 && count <= 29) return 'forth'
    if (count >=30 ) return 'fifth'
}

const translateMonth = (month) => {
    switch (month) {
        case "January":
            return 'Янв.';
        case "February":
            return 'Февр.';
        case "March":
            return 'Март';
        case "April":
            return 'Апр.';
        case "May":
            return 'Май';
        case "June":
            return 'Июнь';
        case "July":
            return 'Июль';
        case "August":
            return 'Авг.';
        case "September":
            return 'Сент.';
        case "October":
            return 'Окт.';
        case "November":
            return 'Нояб.';
        case "December":
            return "Дек."
    }
}

const translateDayOfWeek = (day) => {
    switch (day) {
        case "Sun":
            return "Воскресенье"
        case "Mon":
            return "Понедельник"
        case "Tue":
            return "Вторник"
        case "Wed":
            return "Среда"
        case "Thu":
            return "Четверг"
        case "Fri":
            return "Пятница"
        case "Sat":
            return "Суббота"
    }
}
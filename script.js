var inputdob = document.querySelector(".inputdob");
var showBtn = document.querySelector("#show-btn");
var outputTxt = document.querySelector("#output");

function clickHandler() {
    var birthdayStr = inputdob.value;
    if (birthdayStr !== "") {
        var bdayArr = birthdayStr.split("-");
        var dateObj = {
            day: Number(bdayArr[2]),
            month: Number(bdayArr[1]),
            year: Number(bdayArr[0])
        }
        //console.log(dateObj)

        var isPalindrome = checkPalindrome(dateObj);
        if (isPalindrome) {
            outputTxt.innerText = "Congratulations! Your birthday is palindrome.🎁🥳"
        }
        else {
            const [count, nextDate] = getNextPalindrome(dateObj);
            const [prevCount, prevDate] = getPreviouPalindrome(dateObj);
            outputTxt.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${count} ${(count == 1) ? "day" : "days"}😴 and 
            the previous palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year}, you missed it by ${prevCount} ${(prevCount == 1) ? "day" : "days"}😥
            `
        }
        //console.log(isPalindrome)
    }
}

showBtn.addEventListener("click", clickHandler);








function reverseStr(str) {
    const reverse = str.split("").reverse().join("");
    return reverse;
}
function isPalindrome(str) {
    const reverse = reverseStr(str);
    return reverse == str;
}
function convertDateToStr(date) {
    var dateStr = { day: "", month: "", year: "" }
    if (date.day < 10) {
        dateStr.day = "0" + date.day;
    } else {
        dateStr.day = date.day.toString();
    }
    if (date.month < 10) {
        dateStr.month = "0" + date.month;
    } else {
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();
    return dateStr;
}
function getAllDateFormat(date) {
    var dateStr = convertDateToStr(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindrome(date) {
    var listOfDate = getAllDateFormat(date);

    var isDatePalindrome = false;

    for (let i = 0; i < listOfDate.length; i++) {
        if (isPalindrome(listOfDate[i])) {
            isDatePalindrome = true;
            break;
        }
    }
    return isDatePalindrome;
}

function isLeapYear(year) {
    if (year % 400 === 0 || year % 4 === 0) {
        return true;
    }
    // if (year % 100 === 0) {
    //     return false;
    // }
    return false;
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonthArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                month++;
                day = 1;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    }
    else {
        if (day > daysInMonthArr[month - 1]) {
            day = 1;
            month++
        }
    }
    if (month > 12) {
        year++;
        month = 1
    }

    return {
        day: day,
        month: month,
        year: year
    }
}

function getNextPalindrome(date) {
    var count = 0;
    var nextDate = getNextDate(date);

    while (1) {
        count++;
        var isPalindrome = checkPalindrome(nextDate);
        if (isPalindrome) {
            break
        } else {
            nextDate = getNextDate(nextDate);
        }
    }
    return [count, nextDate];
}

function getPreviousDate(date) {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;
    var daysInMonthArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (day === 0) {
        month--;
        if (month === 2) {
            if (isLeapYear(year)) {
                day = 29;
            }
            else {
                day = 28;
            }
        }
        else if (month === 0) {
            month = 12;
            day = 31;
            year--;
        }
        else {
            day = daysInMonthArr[month - 1];
        }
    }

    return {
        day: day,
        month: month,
        year: year
    }
}

function getPreviouPalindrome(date) {
    var count = 0;
    var prevDate = getPreviousDate(date);

    while (1) {
        count++;
        var isPalindrome = checkPalindrome(prevDate);
        if (isPalindrome) {
            break
        } else {
            prevDate = getPreviousDate(prevDate);
        }
    }
    return [count, prevDate];
}

// var date = {
//     day: 2,
//     month: 11,
//     year: 2020
// }
//console.log(checkPalindrome(date))
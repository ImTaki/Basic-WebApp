// 获取有事的日期
function getCalendarBusyDays() {

    var startDate = new Date();

    var endDate = new Date(new Date().setFullYear(startDate.getFullYear() + 1));

    var cal = CalendarApp.getCalendarsByName("taki.guan@gmail.com")[0];

    var event = cal.getEvents(startDate, endDate);

    var days = event.map(function (r) {
        return r.getStartTime().setHours(0, 0, 0, 0);
    });

    var uniqueDays = [];

    days.forEach(function (d) {
        if (uniqueDays.indexOf(d) === -1) {
            uniqueDays.push(d);
        }

    });

    return uniqueDays;

    // Logger.log(uniqueDays);

}

function getCost(zipCode) {

    var ss = SpreadsheetApp.openById(id);
    var ws = ss.getSheetByName("Estimate");
    var data = ws.getRange(1, 1, ws.getLastRow(), 2).getValues();

    var zipCodeLists = data.map(function (row) {
        return row[0];
    });

    var costLists = data.map(function (row) {
        return row[1];
    });

    var postion = zipCodeLists.indexOf(zipCode);

    if (postion > -1) {
        return "$" + costLists[postion].toFixed(2);
    } else {
        return 'Unavailable';
    }

}


function userClick(userInfo) {

    var sheet = SpreadsheetApp.openById(id);
    var ws = sheet.getSheetByName("Data");

    ws.appendRow([userInfo.firstName, userInfo.lastName, userInfo.app, userInfo.zip, userInfo.est, new Date()]);

    // Logger.log(name + " Click the Button")

}

function getEmployeeDataFromSheet() {

    var ss = SpreadsheetApp.openById(id);
    var ws = ss.getSheetByName("DataTables");
    var data = ws.getRange(2, 1, ws.getLastRow() - 1, 6).getValues();

    Logger.log(data);

    return data;

}
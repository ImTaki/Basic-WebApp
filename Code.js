/*
 * @Descripttion: 从Google Sheet中获取数据
 * @version: 1
 * @Author: Taki Guan
 * @Date: 2019-09-27 09:49:56
 * @LastEditors: Taki Guan
 * @LastEditTime: 2019-10-17 16:34:04
 */
var id = "1T3gsjezKPaZd60l6CuyM8pnuM9FaAxsSuzdrDvHP3tA";

var Route = {};
Route.path = function (file, callback) {
    Route[file] = callback;
}

function doGet(e) {

    // Logger.log(e);
    Route.path("form", loadForm);
    Route.path("about", loadAbout);
    Route.path("login", loadLogin);

    if (Route[e.parameters.v]) {
        return Route[e.parameters.v]();
    } else {
        return render("home");
    }

}

function loadForm() {

    var ss = SpreadsheetApp.openById(id);
    var ws = ss.getSheetByName("Options");
    var list = ws.getRange(1, 1, ws.getLastRow(), 1).getValues();

    var htmlArray = list.map(function (row) {
        return '<option>' + row[0] + '</option>'
    }).join('');


    return render("page", {
        list: htmlArray
    });

}

function render(file, argsObj) {

    var tmp = HtmlService.createTemplateFromFile(file);

    if (argsObj) {
        var keys = Object.keys(argsObj);

        keys.forEach(function (key) {
            tmp[key] = argsObj[key];
        });

    }

    return tmp.evaluate();

}

function loadAbout() {
    return render("about");
}

function loadLogin() {
    return render("login");
}
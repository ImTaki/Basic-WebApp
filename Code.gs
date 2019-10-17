/*
 * @Descripttion: 从Google Sheet中获取数据
 * @version: 1
 * @Author: Taki Guan
 * @Date: 2019-09-27 09:49:56
 * @LastEditors: Taki Guan
 * @LastEditTime: 2019-10-17 14:36:27
 */
var id = "1T3gsjezKPaZd60l6CuyM8pnuM9FaAxsSuzdrDvHP3tA";

function doGet(e) {

    // Logger.log(e);

    if (e.parameters.v == "form") {
        return loadForm();
    } else {
        return HtmlService.createHtmlOutput("<h1>Hello</h1>");
    }

}

function loadForm() {

    var ss = SpreadsheetApp.openById(id);
    var ws = ss.getSheetByName("Options");
    var list = ws.getRange(1, 1, ws.getLastRow(), 1).getValues();

    var htmlArray = list.map(function (row) {
        return '<option>' + row[0] + '</option>'
    }).join('');

    var tmp = HtmlService.createTemplateFromFile("page");

    tmp.list = htmlArray;

    return tmp.evaluate();

}
const fs = require("fs");
const request = require("request");
const jsdom = require("jsdom");

request(
    {
        method: "GET",
        url: "http://www.netbian.com/dongman/",
        headers: {},
    },
    function (err, res, body) {
        let dom = new jsdom.JSDOM(body);
        [...dom.window.document.querySelectorAll("oldimg")].forEach((item) => {
            console.log(item.src);
        });
        // console.log(dom.window.document.querySelector("oldimg"));
    }
);

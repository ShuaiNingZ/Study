const User = require('../models/User');
const Article = require('../models/Article');
const Column = require('../models/Column');
const Comment = require('../models/Comment');

module.exports = {
    Article: {
        "queryAct": "findByIdAndUpdate",
        "options": function () {
            return {
                "$inc": {
                    "hits_num": 1
                }
            }
        }
    }
}

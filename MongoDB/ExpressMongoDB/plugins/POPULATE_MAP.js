module.exports = {
    "Article": [
        {
            "path": "author",
            "select": "nickname avatar"
        },
        {
            "path": "column",
            "select": "name"
        },
        {
            "path": "comments",
            "select": "content date uid",
            "populate": {
                "path": "uid",
                "select": "nickname avatar",
            }
        }
    ],
    "Comment": [
        {
            "path": "uid",
            "select": "nickname avatar"
        }
    ],
    "User": [
        {
            "path": "",
            "select": "username email avatar nickname"
        }],
    "Column": [
        {
            "path": "aids",
            "select": "title cover date hit_num comment_num like_num author"
        }
    ]
}

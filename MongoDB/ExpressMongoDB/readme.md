### 接口

- 登录 login POST
- 注册 register POST
- 公钥获取 publicKey GET
- 上传文件 upload POST
- 鉴权
     访客 无登录 无鉴权
        GET
          articles
          comments
          keys
          columns
          search
        POST
          comments
          register
          
     用户 登录 鉴权
        GET
          articles 
          comments
          keys
          columns
          search
        POST
          articles
          comments 
          columns
          upload
          
     JWT 需要验证 token 的 api
        POST
          articles
          columns
          upload
        PUT
          articles
          columns
          userInfo
        DELETE
          articles
          columns
          userInfo

### 测试_id
- columns 660bb93c9a0b999e9e8bad08
- users 6604d3719c1223833a467085
- articles 66124458e26a8ed7dc05df9d

### 模块

- User 管理模块 ['添加', '查询', '验证']
- Key 管理模块 ['生成秘钥', '获取公钥', '加密', '解密']
- jsonwebtoken ['创建 Token']

### 中间件

- CORS 跨域 携带 Cookie
- express-JWT 验证 Token

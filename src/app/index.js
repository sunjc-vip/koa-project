const path = require("path");
const Koa = require("koa");
const { koaBody } = require("koa-body");
const KoaStatic = require("koa-static");

const userRouter = require("../router/user.route");

const app = new Koa();

app.use(
  koaBody({
    multipart: true,
    formidable: {
      // 在配制选项option里, 不推荐使用相对路径
      // 在option里的相对路径, 不是相对的当前文件. 相对process.cwd()
      uploadDir: path.join(__dirname, "../upload"),
      keepExtensions: true,
    },
    parsedMethods: ["POST", "PUT", "PATCH", "DELETE"],
  })
);
app.use(KoaStatic(path.join(__dirname, "../upload")));
app.use(userRouter.routes());

module.exports = app;

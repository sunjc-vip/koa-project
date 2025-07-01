const Koa = require('koa')
const app = new Koa()
const sequelize = require('./db'); 
const Article = require('./models/Article');

// 创建文章
app.use(async (ctx) => {
  if (ctx.path === '/createArticle' && ctx.method === 'POST') {
    try {
      const { title, content, author } = ctx.request.body;
      const article = await Article.create({ title, content, author });
      ctx.body = article;
    } catch (error) {
      console.error('Create article error:', error);
      ctx.status = 500;
      ctx.body = 'Create article error';
    }
  } else if (ctx.path === '/getArticles' && ctx.method === 'GET') {
    try {
      const articles = await Article.findAll();
      ctx.body = articles;
    } catch (error) {
      console.error('Get articles error:', error);
      ctx.status = 500;
      ctx.body = 'Get articles error';
    }
  } else {
    try {
      // 执行原始 SQL 查询
      const [results] = await sequelize.query('SELECT 1 + 1 AS result');
      ctx.body = `Database test result: ${results[0].result}`;
    } catch (error) {
      console.error('Database error:', error);
      ctx.status = 500;
      ctx.body = 'Database error';
    }
  }
});

app.listen(3000, () => {
  console.log('app is running at port 3000')
})  
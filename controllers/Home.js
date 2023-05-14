// 服务端渲染

    // 配置文件
const PAGE_CONF = require('../configs/page'),
      navData = require('../configs/nav'),
      linkData = require('../configs/link'),
      manualData = require('../configs/manual'),
      { infomation } = require('../configs/qr'),
      { IMG_BASE_URL } = require('../configs/url'),
      { searchData } = require('../libs/utils');

      // 操作数据库获取数据方法 
const { getSliderData } = require('../services/Slider'),
      { getRecomCourseData } = require('../services/RecomCourse'),
      { getCollectionData } = require('../services/Collection'),
      { getStarTeacherData } = require('../services/Teacher'),
      { getGoodStudentData } = require('../services/Student'),
      { getCourseCategory } = require('../services/CourseTab'),
      { getCourseData } = require('../services/Course');

class Home {
  // 首页页面
  async index (ctx, next) {
    
    // 获取数据库中的数据
    const sliderData = await getSliderData(),
          recomCourseData = await getRecomCourseData(),
          collectionData = await Promise.all((await getCollectionData()).map(async (item) => item)),
          starTeacherData = await getStarTeacherData(),
          goodStudentData = await getGoodStudentData();

          // 返回服务端渲染的页面
    await ctx.render('index', {
      // 传入配置项
      PAGE_CONF: PAGE_CONF.INDEX,
      IMG_BASE_URL,
      qrInfomation: infomation,
      navData,
      sliderData,
      recomCourseData,
      collectionData,
      starTeacherData,
      goodStudentData,
      linkData,
      manualData
    });
  }

  // 列表页面
  async list (ctx, next) {
    // 获取参数上的关键字
    const keyword = ctx.params.kw,
          courseTabData = await getCourseCategory(),
          courseData = await getCourseData();

    await ctx.render('list', {
      PAGE_CONF: PAGE_CONF.LIST,
      IMG_BASE_URL,
      qrInfomation: infomation,
      navData,
      linkData,
      manualData,
      courseTabData,
      courseData: keyword ? searchData(courseData, keyword) : courseData,
      courseDataStr: JSON.stringify(courseData)
    });
  }

  // 错误页面
  async error (ctx, next) {
  	await ctx.render('error', {
      PAGE_CONF: PAGE_CONF.ERROR,
      qrInfomation: infomation,
      navData,
      linkData,
      manualData
  	});
  }
}

module.exports = new Home();
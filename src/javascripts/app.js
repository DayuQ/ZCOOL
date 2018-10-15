
//jack-detail
// tom-login

//rem
// require('./modules/flexible');
// import './modules/flexible'

import Router from './router'
import activity_controller from './controllers/activity_controller';


// 渲染视图
activity_controller.render();  
   
// 启动路由
const router = new Router({ initial: '#/original' });
window.router = router;
router.init();



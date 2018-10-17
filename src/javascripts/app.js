

import Router from './router'
import activity_controller from './controllers/activity_controller';
import original_controller from './controllers/original_controller';





// 渲染视图
activity_controller.render();  
original_controller.render();
   
// 启动路由 
const router = new Router({});
window.router = router;
router.init();



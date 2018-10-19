


import activity_controller from './controllers/activity_controller';


// 渲染视图
// activity_controller.render();  


import Router from './router' 
import job_controller from './controllers/job_controller'

import job_profile_controller from './controllers/job_profile_controller';
// 渲染视图 
job_controller.render();
job_profile_controller.render();

import original_controller from './controllers/original_controller';





// 渲染视图
activity_controller.render();  
original_controller.render();
   
// 启动路由 
const router = new Router({});
window.router = router;
router.init();




//jack-detail
// tom-login

//rem
// require('./modules/flexible');
// import './modules/flexible'


import activity_controller from './controllers/activity_controller';


// 渲染视图
// activity_controller.render();  


import Router from './router' 
import job_controller from './controllers/job_controller'

import job_profile_controller from './controllers/job_profile_controller';
// 渲染视图 
job_controller.render();
job_profile_controller.render();
   
// 启动路由
const router = new Router({ initial: '#/job' });
window.router = router;
router.init();



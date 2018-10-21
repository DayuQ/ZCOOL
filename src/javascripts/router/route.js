
import original_controller from '../controllers/original_controller';
import activity_controller from '../controllers/activity_profile_controller'; 
import job_controller from '../controllers/job_controller';
import login_controller from '../controllers/login_controller';

import job_profile_controller from '../controllers/job_profile_controller';
import download_app from '../controllers/download_app';
const routes = {
    '#/original': original_controller,
    '#/activity': activity_controller, 
    '#/job':job_controller,
    '#/job_profile': job_profile_controller,
    '#/login':login_controller,
    '#/download_app':download_app,
    '#/job_profile': job_profile_controller
}

export { routes } ;



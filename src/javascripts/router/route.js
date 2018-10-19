
import original_controller from '../controllers/original_controller';
import activity_controller from '../controllers/activity_controller'; 
import job_controller from '../controllers/job_controller';

import job_profile_controller from '../controllers/job_profile_controller';

const routes = {
    '#/original': original_controller,
    '#/activity': activity_controller, 
    '#/job':job_controller,
    '#/job_profile': job_profile_controller
}

export { routes } ;



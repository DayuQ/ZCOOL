

import profile_template from '../views/job-profile.html';

const render = () => {
    document.querySelector('#root').innerHTML = profile_template;
    slideout();
}
 
 
const slideout = ()=>{
    var slideout = new Slideout({
        'panel': document.getElementById('panel'),
        'menu': document.getElementById('menu'),
        'padding': 400,
        'tolerance': 70
    });
    // Toggle button

    let toggle_button_flag = true;

    document.querySelector('.toggle-button').addEventListener('click', function () {
        slideout.toggle();
        alert();
        if( toggle_button_flag){
            $(this).removeClass("icon-sanhengxian").addClass("icon-guanbi");
            toggle_button_flag = false;
        }else{
            $(this).removeClass("icon-guanbi").addClass("icon-sanhengxian");
            toggle_button_flag = true;
        }
    });
}

export default {
    render
}


import profile_template from '../views/job-profile.html';

const render = () => {
    document.querySelector('#root').innerHTML = profile_template;
    slideout();
}
 
 
const slideout = ()=>{
    var slideout = new Slideout({
        'panel': document.getElementById('panel'),
        'menu': document.getElementById('menu'),
        'padding': 256,
        'tolerance': 70
    });

    // Toggle button
    document.querySelector('.toggle-button').addEventListener('click', function () {
        slideout.toggle();
    });
}

export default {
    render
}
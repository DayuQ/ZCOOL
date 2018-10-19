// home 视图的控制器
import activity_template from '../views/activity.html'; 

// const job_controller = require('./home_job_controller'); 
// const search_controller = require('./search_controller'); 
// const profile_controller = require('./profile_controller'); 

// 负责将home视图模板渲染在对应的地方
const render = () => {
    // 刚才说了，一切皆模块，说明html也是模块，看一下它暴露的是什么 发现是字符串
    // console.log(homeTemplate)
    document.querySelector('#root').innerHTML = activity_template;


    // switchTab();
    // $('.home-title').tap(function () {
    //     router.switch('#/avtivity');
    // })
    slideout();
    SearchMask();
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

        if( toggle_button_flag){
            $(this).removeClass("icon-sanhengxian").addClass("icon-guanbi");
            toggle_button_flag = false;
        }else{
            $(this).removeClass("icon-guanbi").addClass("icon-sanhengxian");
            toggle_button_flag = true;
        }
    });
}

//点击搜索 渲染视图
const SearchMask = ()=>{
    document.querySelector('.search-sousou').addEventListener('tap',function(){
        document.querySelector('.mask-search').style.display="block";
    })
    document.querySelector('.search-cancel').addEventListener('tap',function(){
        document.querySelector('.mask-search').style.display="none";
    })
    document.querySelector('.cover').addEventListener('tap',function(){
        document.querySelector('.mask-search').style.display="none";
    })
}





// // 切换标签
// const switchTab = () => {
//     $('.footer__item').on('tap', function () {
//         let _controllers = [ job_controller, search_controller, profile_controller ];
//         _controllers[$(this).index()].render();
//         $(this).addClass('active').siblings().removeClass('active');
//     })
// }

export default { render }


// 需求： 显示home  MVC
// home 视图的控制器
import activity_template from '../views/activity.html'; 
import activity_controller from './activity_controller';


// 负责将home视图模板渲染在对应的地方
const render = () => {

    document.querySelector('#root').innerHTML = activity_template;
    activity_controller.render();
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



export default { render }


// 需求： 显示home  MVC
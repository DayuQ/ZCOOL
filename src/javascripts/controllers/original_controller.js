// home 视图的控制器
import original_template from '../views/original.html'; 
import original_aryicle_controller from './original_aryicle_controller';
// const job_controller = require('./home_job_controller'); 
// const search_controller = require('./search_controller'); 
// const profile_controller = require('./profile_controller'); 

// 负责将home视图模板渲染在对应的地方
const render = () => {

    document.querySelector('#root').innerHTML = original_template;

    $('.home-title').tap(function () {
        router.switch('#/original');
    })

    original_aryicle_controller.render();
    console.log("original_con")
    original_Mask();
    
}

let original_Mask_flag = true;

const original_Mask = ()=>{
    $(".original-Mask-btn").on("tap",function(){
        if( original_Mask_flag){
            $(".original-Mask").show();
            $(this).removeClass("icon-sanhengxian").addClass("icon-guanbi");
            original_Mask_flag = false;
        }else{
            $(".original-Mask").hide();
            $(this).removeClass("icon-guanbi").addClass("icon-sanhengxian");
            original_Mask_flag = true;
        }       
    })

}


export default { render }

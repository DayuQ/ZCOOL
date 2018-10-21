// home 视图的控制器
import original_template from '../views/original.html'; 
import original_aryicle_controller from './original_aryicle_controller';

// 负责将home视图模板渲染在对应的地方
const render = () => {

    document.querySelector('#root').innerHTML = original_template;

    $('.home-title').tap(function () {
        router.switch('#/original');
    })

    original_aryicle_controller.render();
    console.log("original_con")
    original_Mask();

    open_app_mask();
    
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

const open_app_mask = ()=>{
    $(".original-app-open").on("tap",function(){
        $(".open_app_mask").css({"display":"flex"});
    })
    $(".open_app_content_close").on("tap",function(){
        $(".open_app_mask").hide();
    })
    $(".open_app_content_p2").on("tap",function(){
        $(".open_app_mask").hide();
    })
}

export default { render }

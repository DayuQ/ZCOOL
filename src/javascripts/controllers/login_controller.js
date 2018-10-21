// home 视图的控制器
import login_template from '../views/login.html'; 



// 负责将home视图模板渲染在对应的地方
const render =   () => {
    document.querySelector('#root').innerHTML = login_template;
    changeLoginType();
}


const changeLoginType = ()=>{

    $('.login-type-phone').on('tap',function(){
        document.querySelector('.login-phone').style.display = "none";
        document.querySelector('.login-password').style.display = "block"
    })

    $('.login-type-password').on('tap',function(){
        document.querySelector('.login-phone').style.display = "block";
        document.querySelector('.login-password').style.display = "none"
    })
}






export default { render }


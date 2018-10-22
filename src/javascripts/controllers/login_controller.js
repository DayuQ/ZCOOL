// home 视图的控制器
import login_template from '../views/login.html'; 



// 负责将home视图模板渲染在对应的地方
const render =   () => {
    document.querySelector('#root').innerHTML = login_template;
    changeLoginType();
}


const changeLoginType = ()=>{

    
    //密码登录,验证了用户名，密码非空即可
    $('.login-password').on('input change',function(){
         let myUsername=localStorage.getItem("username")
         console.log(myUsername);
         
         //非空按钮变色
         if($('.login-password p.username input').val()&&$('.login-password p.password input').val()){ 
             document.querySelector('.login-password .login-btn').style.background="#ffd100"
             //验证登录
             if($('.login-password p.username input').val()==myUsername&&$('.login-password p.password input').val()){ 
                document.querySelector('.login-password .login-btn').style.background="#ffd100"
                $('.login-btn').on('tap',function(){
                   $("#tel-loginForm").submit();
                })
            }
             
         }else{
            document.querySelector('.login-password .login-btn').style.background=""
         }
          
     })
 
     //电话号登录，顺带注册，做了电话号码的正则验证，验证码非空即可
     $('.login-phone').on('input change',function(){

        let sMobile=$('.login-phone p.phone input').val()
        // console.log(sMobile);
        // console.log((/^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/.test(sMobile)));

         if(/^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/.test(sMobile)){
             document.querySelector('.login-phone .login-btn').style.background="#ffd100"
             
             if($('.login-phone p.verify input').val()){
                $('.login-btn').on('tap',function(){
                    localStorage.setItem("username",sMobile);
    
                    console.log(localStorage.getItem("username"));
                    
                    $("#tel-loginForm").submit();
                 })
             }
         }else{
            document.querySelector('.login-phone .login-btn').style.background=""
         }
          
     })

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


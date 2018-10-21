// home 视图的控制器
import download_app_template from '../views/download_app.html'; 



// 负责将home视图模板渲染在对应的地方
const render = () => {

    document.querySelector('#root').innerHTML = download_app_template;

   
}




export default { render }

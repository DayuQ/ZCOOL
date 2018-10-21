
import original_template from '../views/original_aryicle.html';
import aryicle_model    from '../models/original_aryicle_model';

import { async } from 'rxjs/internal/scheduler/async';

// 当前加载信息的页数
let _pageNo = 1;
let datasources = [] // 页面要显示的所有的数据



const render = async () => {
    await getAryicleList(_pageNo);

    renderAryicleList();


    loadMore(_pageNo);
   // handleContentScroll();
}



const getAryicleList = async () => { // 获取某一页数据
    let _aryicle_data = await aryicle_model.original_aryicle_list(_pageNo)

    let _aryicle_list = _aryicle_data.data.content

    datasources = [ ...datasources, ..._aryicle_list ]

     // 每次获取到新的数据后重新渲染  
     renderAryicleList();
}

const renderAryicleList = ()=>{
    let _template = Handlebars.compile(original_template)
     // 将handlebar模板编译成html格式的字符串
    let _html = _template({ aryicle_list : datasources}) 
     //  渲染视图
    $('.original-article-content').html(_html)
}

const loadMore = () => { // 点击加载更多每次加载新的数据
    $('.original-main-more').on('tap', () => {
        _pageNo ++;
        getAryicleList(_pageNo);
    })
}

export default {
    render
}
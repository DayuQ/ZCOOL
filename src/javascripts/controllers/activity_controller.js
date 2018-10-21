
import activity_template from '../views/activity_model_content.html'; 
import activity_model from '../models/activity_model';
import BScroll from 'better-scroll';
import { async } from 'rxjs/internal/scheduler/async';

// 当前加载信息的页数
let _pageNo = 1;
let datasources = [] // 页面要显示的所有的数据



const render = async () => {
    await getActivityList(_pageNo);

    renderActivityList();


    loadMore(_pageNo);
   // handleContentScroll();
}



const getActivityList = async () => { // 获取某一页数据
    let _activity_data = await activity_model.activity_list(_pageNo)

    // 多个职位信息数组
    let _activity_list = _activity_data.data.content

    datasources = [ ...datasources, ..._activity_list ]

     // 每次获取到新的数据后重新渲染  
     renderActivityList();
}

const renderActivityList = ()=>{
    let _template = Handlebars.compile(activity_template)
     // 将handlebar模板编译成html格式的字符串
    let _html = _template({ activity_list : datasources}) 
     //  渲染视图
    $('.activity-list ul').html(_html)
}

const loadMore = () => { // 点击加载更多每次加载新的数据
    $('.view-more').on('tap', () => {
        _pageNo ++;
        getActivityList(_pageNo);
    })
}

export default {
    render
}
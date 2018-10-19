
import job_template from '../views/job.html';
import job_content_template from '../views/job-content.html';
import job_model    from '../models/home_job_model';

import BScroll from 'better-scroll';

let async = require("async");//下载未用

// 当前加载的职位信息的页数
let _pageNo = 1;//页号
let _pageSize=15;//每次加载的个数
let datasources = [] // job页面要显示的所有的数据
let _job_scroll=null;
let _job_data=null;// 多个职位信息数据
let _job_list=[];// 多个职位信息数据中 的数组
let filter_job_list=[]//筛选过后的数据

const render = () => {
   
    document.querySelector('#root').innerHTML = job_template;
     

    //getJobList();
     handleContentScroll();

    $('.home-title').tap(function () {
        router.switch('#/job');
    })

    slideout();

    city_click();
    
    
}   

const doFilter = async (filter_name)=>{
    _job_data = await job_model.job_list(_pageNo)
    //console.log(_job_data);
    
    // 多个职位信息数组
    _job_list = _job_data.content.data.page.result

   
    console.log(_job_list);

    filter_job_list=_job_list.filter(
        function(item) {
            return item.city == filter_name
        }
    );
    console.log("筛选数据",filter_job_list); 
    if(filter_job_list.length<=5){
        console.log("不可滚动");
         
    }
    
    
}
//点击地址，弹出遮盖层
const city_click = async ()=>{ 
    
        
    $('.job-city').on('tap',function(e){ 
       //点击地址，弹出遮盖层
        if($('.citiesSimple').hasClass('active')){
            $('.citiesSimple').removeClass('active');
            _job_scroll.enable();
        }else{
            $('.citiesSimple').addClass('active');
            _job_scroll.disable();
            
        }
        //点击除选择城市之外的地方，则弹出层消失
        $('.citiesSimple-toggle').tap(function(){
            $('.citiesSimple').removeClass('active');
            _job_scroll.enable();
        })

      
        //点击选择城市,筛选数据
        $('.citiesSimple-module-items').on('tap',async function(e){
             
            document.querySelector('.job-city a').innerHTML=e.target.innerHTML;
            document.querySelector('.citiesSimple-module-current').innerHTML=e.target.innerHTML;

            await getJobList(); // 初始加载第一页
            doFilter(e.target.innerText)
            $('.citiesSimple').removeClass('active');
            _job_scroll.enable();
             
            
        })

    })
}


const handleContentScroll = async () => { // 处理整个程序滚动等等逻辑
     
    // 实力和bscroll
    _job_scroll = new BScroll('.job-main', {
        startY: 0,
        probeType: 2
    });

    await getJobList(); // 初始加载第一页
    _job_scroll.refresh(); // 异步加载完成后，让better-scroll重新计算
 
    
    let _o_scroll_info_bottom = $('.scroll-info--bottom') // 下拉刷新的dom元素
    let _o_scroll_info_bottom_title = _o_scroll_info_bottom.find('.scroll-info__title') // 下拉刷新的文字dom
 

    let _scroll_bottom_sta = false;
    
    _job_scroll.on('scroll', ({ x, y }) => {
        console.log("执行滚动");
        _scroll_bottom_sta = false;
        if ( _job_scroll.maxScrollY - y > 0 ) {
            _scroll_bottom_sta = true;
            _o_scroll_info_bottom_title.html('放开去加载')
        }
    })

    _job_scroll.on('scrollEnd', async ({ x, y }) => { 
        if ( _job_scroll.maxScrollY - y === 0 && _scroll_bottom_sta ) {
            
            _o_scroll_info_bottom_title.html('正在加载')
            _o_scroll_info_bottom.addClass('loading')
            _pageNo ++
            await getJobList();
            _o_scroll_info_bottom_title.html('上拉去加载')
            _o_scroll_info_bottom.removeClass('loading')
            _job_scroll.refresh()

        }
    })
}
 
const getJobList = async () => { // 获取某一页数据

//     let _job_data = await job_model.job_list(_pageNo)
//     //console.log(_job_data);
    
//     // 多个职位信息数组
//     let _job_list = _job_data.content.data.page.result
//   // console.log(_job_list);
    
    // if(){//获取城市地址，是-》用筛选过的数据，否-》直接获取定位的默认地址筛选的数据

    // }
    
     //获取城市地址，筛选数据
    //filter_job_list为筛选过的数据
    await doFilter(document.querySelector('.job-city a').innerText);
    datasources = [ ...datasources, ...filter_job_list ]

    renderJobList() // 每次获取到新的数据后重新渲染
   
}

const renderJobList = () => { // 渲染job-content
    // 将html字符串处理成编译函数
    let _template = Handlebars.compile(job_content_template)
    // 将handlebar模板编译成html格式的字符串
    let _html = _template({ _job_list: datasources})
    //  渲染job视图
    $('.job-container main .job-content').html(_html)
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
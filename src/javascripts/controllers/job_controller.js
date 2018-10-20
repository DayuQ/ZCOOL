
import job_template from '../views/job.html';
import job_content_template from '../views/job-content.html';
import job_model    from '../models/home_job_model';

import BScroll from 'better-scroll';

let async = require("async");//下载未用

// 当前加载的职位信息的页数
let _cityId=47;//默认为47，即北京的城市id
let _pageNo = 1;//页号 
let _pageSize=15;//每次加载的个数

let isChangeCity=false;
let datasources = [] // job页面要显示的所有的数据
let _job_scroll=null;

let arr4=[];//当前城市
let nowCity=47;



let isChange=true;//是否可更改

//筛选器的信息；
var arr =[{city: '北京',yes:false,cityId:47}
,{city: '上海',yes:true,cityId:66}
,{city: '广州',yes:true,cityId:452}
,{city: '杭州',yes:true,cityId:438}
,{city: '深圳',yes:true,cityId:454}
,{city: '全国',yes:true,cityId:-1}
,{city: '其他城市',yes:true,cityId:0}
];
  //点击选择城市,筛选数据 北京的cityId:47;上海：66；广州：452；杭州：438；深圳：454；
  //全国：-1；其他城市：0；
 
const render = () => {
    document.querySelector('#root').innerHTML = job_template;
    handleContentScroll();
    $('.home-title').tap(function () {
        router.switch('#/job');
    }) 
    slideout(); 
    city_click();

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

      
        //点击选择城市,筛选数据 北京的cityId:47;上海：66；广州：452；杭州：438；深圳：454；
        //全国：-1；其他城市：0；
        $('.citiesSimple-module-items').on('tap',async function(e){
            isChangeCity=true;
            

            console.log('切换城市li',e.target);
            var arr3=arr.filter(function(item){
                return item.city != e.target.innerHTML
            })
           console.log('e.target no现在的',arr3);

           var list="";
            for (let i=0;i<arr3.length;i++)
            {
                list +="<li>"+arr3[i].city+"</li>";
            }
            document.getElementById('box').innerHTML = list;


            //获取当前点击的城市id,改变城市id
            arr4=arr.filter(function(item){
                return item.city == e.target.innerHTML
            })
            _cityId=arr4[0].cityId

            //表示又是可更改状态
            isChange=true;
            console.log('这是arr4',arr4);
            
            
            document.querySelector('.job-city a').innerHTML=e.target.innerHTML;
            document.querySelector('.citiesSimple-module-current').innerHTML=e.target.innerHTML;
            
            
            await getJobList(); // 初始加载第一页
            
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
        _o_scroll_info_bottom.css('display','block')

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

            _o_scroll_info_bottom.css('display','none')
           // _job_scroll.scrollTo(0, document.querySelector('.job-main').clientHeight-80, 300)

        }
    })
}
 

const getJobList = async () => { // 获取某一页数据
   
    //如果arr4[0] !=undefined,则表示已点击过切换城市按钮
    if(arr4[0] !=undefined&&isChange){
        // console.log('属性为false的333444',arr4);
         _cityId = arr4[0].cityId
         console.log(arr4[0].cityId);
         //将之前的其他城市的数据清空
         datasources=[]

         isChange=false

    }
     let _job_data = await job_model.job_list(_cityId,_pageNo)
    // 多个职位信息数组
    let _job_list = JSON.parse(_job_data).data.data
    datasources = [...datasources,..._job_list ]
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

//侧边目录
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
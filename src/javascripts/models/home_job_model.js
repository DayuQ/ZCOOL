
// 提供职位信息数据//下拉刷新时获取数据
const job_list = (pageNo = 1) => {
    //  https://m.lagou.com/listmore.json?pageNo=2&pageSize=15

    // return new Promise(resolve => {
    //     $.ajax({
    //         url: '/lagou/listmore.json?pageNo=2&pageSize=15',
    //         success: (res) => {
    //            resolve(res)
    //         }
    //     })
    // })

    //https://m.zcool.com.cn/job/api/recommendPosition.do?cityId=47&pageNo=2&pageSize=10
    return $.ajax({
           // url: '/zcool/job/api/recommendPosition.do?cityId=47&pageNo='+ pageNo +'&pageSize=10',
           url: '/lagou/listmore.json?pageNo='+ pageNo +'&pageSize=15',
           //url: '/lagou/listmore.json?pageNo='+ pageNo +'&pageSize='+pageSize,
            success: (res) => {
               return res;
            }
        })
    

    // return  $.ajax({
    //             // url: '/static/mock/list.json',
    //             url: '/api/job/list_time',
    //             success: (res) => {
    //                 return res;
    //             }
    //         })

}

//https://m.zcool.com.cn/job/api/recommendPosition.do?cityId=47&pageNo=2&pageSize=10

//上拉刷新时获取数据
const job_refresh = () => {
    return  $.ajax({
               // url: '/zcool/job/api/recommendPosition.do?cityId=47&pageNo=1&pageSize=10',
               url: '/lagou/listmore.json?pageNo=1&pageSize=15',
                success: (res) => {
                    return res;
                }
            })
}

export default {
    job_list,
    job_refresh
}
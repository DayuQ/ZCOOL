
// 提供职位信息数据
const original_aryicle_list = (_pageNo = 1) => {

    //https://api.zcool.com.cn/v2/api//discoverListNew?contentType=0&p=2&ps=10&recommendLevel=3
    //https://api.zcool.com.cn/original/v2/api//discoverListNew?contentType=0&p=2&ps=10&recommendLevel=3
    return $.ajax({
            url: '/original/v2/api//discoverListNew?contentType=0&p='+ _pageNo +'&ps=10&recommendLevel=3',
            success: (res) => {
                return res;
            }
        })
    
}


const original_aryicle_refresh = () => {
    return  $.ajax({
                url: '/original/v2/api//discoverListNew?contentType=0&p=1&ps=10&recommendLevel=3',
                success: (res) => {
                    return res;
                }
            })
}

export default {
    original_aryicle_list,
    original_aryicle_refresh
}
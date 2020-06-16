import fetch from './fetch'

//资讯详情 
export const matterDetail = (data = {}) => {
    return fetch({
        url: "/api/information/detail",
        method: "post",
        data
    });
};

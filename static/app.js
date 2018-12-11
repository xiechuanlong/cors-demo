axios.interceptors.response.use(function (response) {
    // Do something with response data
    console.log('response headers:',response.headers);
    return response;
}, function (error) {
});
new Vue({
    el: '#app',
    methods: {
        request: function(method, url, header, data) {
            axios({
                method,
                url,
                data: data,
                headers: header,
            }).catch(e=>{
                
            })
        },
        cookieRequest: function(method, url, header, data){
            axios.defaults.withCredentials=true
            axios({
                method,
                url,
                data: data,
                headers: header,
            }).then((res)=>{
                console.log(res, '==========')
            }).catch(e => {

            })
        }
    }
})
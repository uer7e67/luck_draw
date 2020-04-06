// 权重
function randomByWeight (config) {
    var sum = 0;   
    config.forEach( (v, i) => {
        sum += v[1]; 
    })
    var ranNum = Math.random() * sum;
    var foo = 0; 
    for(var v of config) {
        foo += v[1]; 
        if(ranNum < foo) {
            return v[0]; 
        }
    }
    return null; 
}


module.exports = {
    randomByWeight
}
module.exports = function(async,Club,_){
  return {
    SetRouting: function(router){
       router.get('/home',this.homePage);
    },
    homePage:function(req,res){
      async.parallel([
        function(callback){
          Club.find({},(err,result) =>{
            callback(err,result);
          })
        }
      ],(err,results)=>{
        const res1=results[0];
        console.log(res1);
        res.render('home',{title:'bellamichaela - Home',data:res1});
      })
      //return res.render('home');//change this by removing return move it inside up

    }
  }
}

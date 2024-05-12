const express=require('express');
const app=express();
const port=3000;
var user = [{
    name: 'Harshal Patil',
    age: 22,
    kidneys: [{

    
         healthy: false 
        }
        
    ]
}];


app.use(express.json());



app.get('',(req,res)=>{
    const kidneys = user[0].kidneys;
    const totalKidneys = kidneys.length;
    let healthyCount = 0;
    let unhealthyCount = 0;

    for (let i = 0; i < totalKidneys; i++) {
        if (kidneys[i].healthy === false) {
            unhealthyCount++;
        } else {
            healthyCount++;
        }
    }

    const message = `A. Number of Kidneys: ${totalKidneys}\nB. Number of Healthy Kidneys: ${healthyCount}\nC. Number of Unhealthy Kidneys: ${unhealthyCount}`;
    res.send(message);
})
app.post('/',(req,res)=>{
    let isKidneysHealthy = req.query.kidneys === 'true'; // Assuming the query parameter is a string representation of boolean
    
    // Assuming 'user' is an array containing user objects
    user[0].kidneys.push({
        healthy: isKidneysHealthy
    });

    res.json({
        msg: "Added"
    });
    
})
app.put('',(req,res)=>{
    let cnt=0;
    for(let i=0;i<user[0].kidneys.length;i++){
        if(!user[0].kidneys[i].healthy){
            cnt++;
        }
    }

    for(let i=0;i<user[0].kidneys.length;i++){
        user[0].kidneys[i].healthy=true;

    }
    if(cnt>0){
        res.json({
            msg:"Unhealthy Kidney replaced By Healthy One"
    
        })
           

    }
    else{
        res.json("All Kidneys are healthy")
    }
    
    
})

app.delete('', (req, res) => {
    let healthyKidneys = [];
    let cnt=0;
    for(let i=0;i<user[0].kidneys.length;i++){
        if (!user[0].kidneys[i].healthy){
            cnt++;
        }
    }
    for (let i = 0; i < user[0].kidneys.length; i++) {
        if (user[0].kidneys[i].healthy) {
            healthyKidneys.push(user[0].kidneys[i]);
        }
        
    }
    if(cnt>0){
        user[0].kidneys = healthyKidneys;
    
    res.json({
        msg: "Unhealthy kidneys removed successfully."
    });

    }
    else{
        res.json({
            msg:"Nice try there is no unHealthy  kidneys is stror"
        })
    }
    
});


app.listen(port,function(){
    console.log("Hospital is On With Address "+port)
})
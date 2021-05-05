const express=require('express');
const mongodb=require('mongodb').MongoClient
const obj=require('mongodb').ObjectID
const cors=require('cors');
const bodyParser=require('body-parser');
const { urlencoded } = require('express');




const app=express();
app.use(cors());
app.use(express.json());
app.use( bodyParser.urlencoded({extended:true}));

 
 
app.post('/postData',(req ,res)=>{
  var firstName=req.body.firstName;
  var lastName=req.body.lastName;
  var serviceValue=req.body.serviceValue;
  var rankValue=req.body.rankValue;
  var tradeValue=req.body.tradeValue;
  var rfIDValue=req.body.rfIDValue;
  mongodb.connect("mongodb://localhost:27017/",function(error,db){
    if(error){
      console.log(error);
    }
    
    else 
    var dbo = db.db("cts");
    var Data={
    name:firstName,
    educaton:lastName,
    serviceValue:serviceValue,
    rankValue:rankValue,
    tradeValue:tradeValue,
    rfIDValue:rfIDValue,
  }
    dbo.collection('employee').createIndex({rfIDValue:1},{unique:true},function(err,result){
      if(err){
        res.send(err)
      }else{dbo.collection('employee').insertOne(Data,function(error,result){
        if(error){
          console.log(error)
        }
        else console.log('Record Added');
             res.send('record added');
      });
      db.close();}
    });
    
    
  });

});
app.get('/data',(req,res)=>{
  mongodb.connect("mongodb://localhost:27017/",function(error,db){
    if(error){
      console.log(error);
    }
    else 
    var dbo = db.db("cts");
      dbo.collection('employee').find({}).toArray(  function(error,result){
      //console.log('name',result);
      res.send(result);
    });
    
    db.close();
    
  });

});

app.post('/part',(req,res)=>{
  var data={
         partValue:req.body.partValue,
         partValueName :req.body.partValueName, 
         locationValue:req.body.locationValue, 
         locationCode:req.body.locationCode, 
        rfIDValue:req.body.rfIDValue, 
        quantity:req.body.quantity
      }
            mongodb.connect("mongodb://localhost:27017/",function(error,db){
        if(error){
          console.log(error);
        }
        else 
        var dbo = db.db("cts");
            dbo.collection('part').insertOne(data,  function(error,result){
          //console.log('name',result);
          res.send(result);
         // console.log(result);
        });
        
        db.close();
        
      });

});
app.get('/partData',(req,res)=>{
  mongodb.connect('mongodb://localhost:27017/',function(error,db){
    if(error){
      throw ('error is',error);
    }
    else
    var dbo=db.db('cts');
    dbo.collection('part').find({}).toArray(function(error,result){
      res.send(result);
      db.close();
      //console.log(result);
    });
  });
  
});
app.put('/updateEmployee',(req,res)=>{
var data={$set:{
   name:req.body.firstName,
   educaton:req.body.lastName,
   serviceValue:req.body.serviceValue,
   rankValue:req.body.rankValue,
   tradeValue:req.body.tradeValue,
   rfIDValue:req.body.rfIDValue
   
  }
  }
  
  var id=req.body.employeeID;
  
  console.log('ID',id);
  console.log('data',data);
 mongodb.connect('mongodb://localhost:27017/',function(error,db){
  
    if(error)
    {
      console.log('error',error);
    }
    else{
      var dbo=db.db("cts");
               dbo.collection('employee').updateOne({"_id":obj(id)},data,function(error,result){
                 if(error)
                 {
                   res.send(error);
                 }
                 else{
                  res.send('updated');
                 console.log(result);
                 console.log('updated');
                 db.close();
                }
               });
      
    }
    
 });

})

app.put('/partUpdate',(req,res)=>{
  var uData={$set:{
           partValue:req.body.partValue,
           partValueName:req.body.partValueName,
           locationValue:req.body.locationValue,
           locationCode:req.body.locationCode,
           rfIDValue:req.body.rfIDValue,
           quantity:1,
          }}
  var partId=req.body.partId;
  //console.log(partId);
  mongodb.connect('mongodb://localhost:27017/',function(err,db){
    if(err){
      console.log(err);
    }
    else{
      var dbo= db.db("cts");
                dbo.collection('part').updateOne({'_id':obj(partId)},uData,function(error,result){
                  if(error){
                    console.log(error);
                  }
                  else{
                    console.log("record submitted");
                    res.send(result);
                  }
                })  
    }
  })

});


app.post('/rfid',(req,res)=>{
  var rfData={
    partValue: req.body.partValue,
    partValueName:req.body.partValueName,
    locationValue:req.body.locationValue,
    locationCode:req.body.locationCode,
    quantity:req.body.quantity,
    rfIDValue:req.body.rfIDValue
  }
  mongodb.connect('mongodb://localhost:27017/',function(err,db){
  if(err){
    console.log(error);
  }else{
     var dbo=db.db('cts');
                 dbo.collection('rfid').insertOne(rfData,function(err,result){
             if(err){
               console.log(error);
             }else{
               console.log('record added')
              // console.log(result);
              res.send(rfData);
               //console.log(rfData);
               db.close();
             }
          });
  }

});
});
app.get('/rfid',(req,res)=>{
  mongodb.connect('mongodb://localhost:27017/',function(error,db){
    if(error){
      throw ('error is',error);
    }
    else
    var dbo=db.db('cts');
    dbo.collection('rfid').find({}).toArray(function(error,result){
      res.send(result);
      db.close();
      //console.log(result);
    });
  });
  
});
app.put('/rfid',(req,res)=>{
  mongodb.connect('mongodb://localhost:27017/',function(error,db){
    if(error){
      throw ('error is',error);
    }
    else
    var dbo=db.db('cts');
    dbo.collection('rfid').drop(function(err,result){
      if(err){
        console.log(err);
      }else console.log('drop');
    });
    db.close();
  });
  
});

app.post('/issuance',(req,res)=>{
  var data={
        rfidData:req.body.rfidData,
        fkIssuance:req.body.fkIssuance
  }
  var rfidData=req.body.rfidData;
  mongodb.connect('mongodb://localhost:27017/',function(error,db){
    if(error){
      throw ('error is',error);
    }
    else
    var dbo=db.db('cts');
    dbo.collection('rfidData').insertOne(data,function(err,result){
      if(err){
        console.log(err);
      }else console.log('added');
             console.log('data',data);
             //res.send(result);
    });

          dbo.collection('part').updateOne({'rfIDValue':rfidData.rfIDValue},{$set:{'quantity':0}},function(err,result){
      if(err){
        console.log(err);
      }else console.log('added');
             console.log('data',data);
             //res.send(result);
    });
    
    db.close();
  });

});


app.post('/issuanceForm',(req,res)=>{
  var data={
          _id:req.body._id,
           user:req.body.user,
           issuanceNo:req.body.issuanceNo,
           issuanceDate:req.body.issuanceDate,
  }
  mongodb.connect('mongodb://localhost:27017/',function(error,db){
    if(error){
      throw ('error is',error);
    }
    else
    var dbo=db.db('cts');
        dbo.collection('issuanceForm').insertOne(data,function(err,result){
      if(err){
        console.log(err);
      }else console.log('added');
             res.send(result);
    });
    db.close();
  });

});


app.listen('3001',()=>{
  console.log('SUCCESS');
});
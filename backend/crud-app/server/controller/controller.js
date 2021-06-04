const Userdb = require('../model/model');


// create and save new user
exports.create = (req,res) => {
    //validate user
    if(!req.body){
        res.status(400).send({message: "Content can not be empty!"})
        return ;
    }

    console.log(req.body);
    //new user
    const user = new Userdb({
        firstname:req.body.firstName,
        lastname:req.body.lastName,
        email:req.body.email,
        mobileNumber:req.body.mobileNumber,
        password : req.body.password,
        confirmPassword : req.body.confirmPassword,
        gender : req.body.gender,    
    })
 //save user in database 
    user 
    .save(user)
    .then(data => {
        res.send(data )
    })
    .catch(err=>{
        res.status(500).send({
            message : err.message || "some error occured while creating a create operation"
        });
    })
}

//retrieve and return all users/and single users
exports.find = (req,res) => {

if(req.body.id){
    const id = req.query.id;
    Userdb.findById(id)
        .then(data => {
            if(!data){
                res.status(404).send({message : "Not found user with id " +id})
            }else{
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({message:"error retrieving Error with id " +id})
        })

}else{
    Userdb.find()
    .then(user => {
        res.send(user)
    })
    .catch(err => {
        res.status(500).send({message : err.message || "Error Occured while retrieving user"})
    })
}
}

//update a new identfied user by user id 
exports.update = (req,res) => {
    if(!req.body){
        res.status(400).send({message: "Data to Update can not be empty!"})
        return ;
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify : false})
    .then(data => {
        if(!data){
            res.status(404).send({message : `can not update user ${id}.Maybe usernot found`})
        }else{
            res.send(data);
        }
    }).catch(err => {
        res.status(500).send({message : "Error Update user information"})
    })
}
//delete a user
exports.delete = (req,res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({message : `can not Delete with ${id}.May be id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({message : `could not delete user with ${id}`})
        })
}

// exports.signin =(req,res)  => {
//     const {email,password} = req.body;
  

//   User.findOne({email},(err,user) => {
//       if(err || !user){
//          return res.status(400).json({
//               error : "User email does not exist"
//           })
//       }
//       if(!user.authenticate(password)){
//            return res.status(401).json({
//                 error :"Email and password does not match"
//             })
//       }
//         //create token
//       const token = jwt.sign({_id:user._id},process.env.SECRET)
    
//       //put token in cookie
//       res.cookie("token",token,{expire:new Date() + 9999})
//       //send response ti front end
//       const{_id, name,email,role} = user;
//       return res.json({ token,user: {_id,name,email ,role} });
//     });
// }; 
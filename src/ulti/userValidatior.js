import user from '../model/user.js'

export function userValidatior (req,res,next) {
    const error = [];
   
    user.findOne({email: req.body.email},(err, user) => {
        if (user) return res.status(400).json({error: "Email or Username has been registerd"});
        else{
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!re.test(req.body.email)){
                error.push("Email is invalid");
            }
            if (req.body.password != req.body.passwordConfirm) error.push("Password and passwordConfirm are not equal");
            if (req.body.password.lenght < 6) error.push("Password must be at least 6 charaters");
            if (error.length > 0){
                res.status(400).json({
                    success: false,
                    message: 'Some errors happen',
                    error: error,
                  });
            }else{
                next();
            }
        }
    })
    
}

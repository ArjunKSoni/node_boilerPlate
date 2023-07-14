const bcrypt = require('bcryptjs')
const db = require("../util/sqlDatabase")

exports.getLogin = (req, res, next) => {
    res.render('authentication/Login', {
      path: '/login',
      pageTitle: 'Login'
    })
  }
  exports.getLogout = (req, res, next) => {
    // req.session.destroy((err) => {
    //   console.log(err);
    res.setHeader('Set-Cookie', `token=nvjrl878f34iin;expires=${new Date().toUTCString()}; HttpOnly`)
    res.redirect("/")
    // });
  }
  exports.getsignup = (req, res, next) => {
    res.render('authentication/signup', {
      path: '/signup',
      pageTitle: 'Signup'
    })
  }
  exports.postLogin = async(req, res, next) => {
    db.execute("select * from auth where email=?",[req.body.email]).then(([data,fields])=>{
        if(data.length==0){
            res.redirect("/login")
        }else{
            console.log(data[0].password);
            bcrypt.compare(req.body.password,data[0].password).then((passComp)=>{
                if(passComp){
                    res.setHeader('Set-Cookie', `token=${data[0].password};Max-Age=2592000; HttpOnly`)
                    res.redirect("/");
                }
                else{
                    res.redirect("/login")
                }
            })

        }
    })
  }
  
  exports.postSignup = async (req, res, next) => {
    password = await bcrypt.hash(req.body.password, 12) //hashes the password (value to hash,salt or level of security);
    console.log(req.body.email, password);
    db.execute("select * from auth where email=?",[req.body.email]).then(([data,fields])=>{
        if(data.length>0){
            res.redirect("/login")
        }else{
            db.execute("insert into auth values(?, ?)", [req.body.email, password]).then(()=>{
                res.setHeader('Set-Cookie', `token=${password};Max-Age=2592000; HttpOnly`)
                // req.session.token = "nvjrl878f34iin";  //using session
                res.redirect("/");
            })
        }
  })
  }
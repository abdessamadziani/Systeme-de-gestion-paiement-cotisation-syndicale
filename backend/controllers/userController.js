
const express = require('express');
const sendEmail= require('../utils/sendEmail')
const jwt=require('jsonwebtoken');
const Admin = require('../models/Admin');




exports.activeTrue = (req, res) => {
    // Update the user's account status to "active"
    Admin.findByIdAndUpdate(req.profile._id, { active: true })
        .exec()
        .then(updatedUser => {
            if (!updatedUser) {
                res.status(500).json({ error: 'Failed to update user account status' });
            } else {
                res.status(200).json({ message: 'Token verified and user account is now active', userId: updatedUser._id });
            }
        })
        .catch(updateErr => {
            res.status(500).json({ error: 'Failed to update user account status' });
        });
};









exports.signup = async (req, res) => {
    const user = new Admin(req.body);
//     if(!req.body.name)
//         {
//             return res.status(400).json({ message: 'username is not allowed to be empty' });

//         }
//     if(!req.body.email)
//         {
//             return res.status(400).json({ message: 'email is not allowed to be empty'});

//         }  
//    if (req.body.role !== "client" || req.body.role !== "livreur") {
//             return res.status(400).json({ message: 'role must be client OR livreur' });
//         }
           


    try {
        const savedAdmin = await user.save();
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.cookie('token', token, { expires: new Date(Date.now() + 600000) });

         const link = `http://localhost:5173/auth/activate-email/${token}`;
        const mailOptions = {
            from: 'Syndicale',
            to: savedAdmin.email, // Use the user's email
            subject: 'Hello Dear '+user.name,
            // html:`<a href="http://localhost:8000/api/admins/profile/${token}">Active Account Now</a>`
             html:`<a href=${link}>Active Account Now</a>`

        }
        // Send the email here
        await sendEmail(mailOptions);

    
        res.status(200).json({ message: 'User registration successful please verify your email', user: savedAdmin });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send email' });
    }
}










exports.signin =(req, res) => {

  const { email, password } = req.body;
  console.log({email})
   if (!email && password) {
            return res.status(400).json({ message: 'email is not allowed to be empty' });

          }
          if (email && !password) {
            return res.status(400).json({ message: 'Invalid password format. It should be alphanumeric and between 3 to 30 characters',

             });
          }


  Admin.findOne({ email }) 
      .then(user => {

        if (!user) {
            return res.status(400).json({ error: 'User not found' });

        }
     

        

          if (!user.authenticate(password)) {
              return res.status(401).json({ message: 'Email and Password do not match' });

          }

       

          if (user.active==false) {
            return res.status(401).json({ error: 'Sorry you need to activate your aacount first check your email' });
        }

          

          const token = jwt.sign({ _id: user._id }, process.env.jwt_SECRET);

          res.cookie('token', token, { expires: new Date(Date.now() + 600000) });

             console.log("good")

          const { _id, name, email } = user;
          res.json({
              token,
              user: { _id, name, email }

          });


         

      })

      .catch(err => {
          console.log(err); // Handle errors properly
          return res.status(500).json({ error: 'Internal server error' });

      });
}







// exports.signin = (req, res) => {
//   const { email, password } = req.body;
//   console.log({ email });

//   if (!email || !password) {
//     return res.status(400).json({ message: 'Both email and password are required' });
//   }

//   Admin.findOne({ email })
//     .then(user => {
//       if (!user) {
//         return res.status(400).json({ error: 'User not found' });
//       }

//       if (!user.authenticate(password)) {
//         return res.status(401).json({ message: 'Email and Password do not match' });
//       }

//       if (!user.active) {
//         return res.status(401).json({ error: 'Sorry, you need to activate your account first. Check your email.' });
//       }

//       const token = jwt.sign({ _id: user._id }, process.env.jwt_SECRET);

//       res.cookie('token', token, { expires: new Date(Date.now() + 600000) });

//       const { _id, name, email, role } = user;
//       res.json({
//         token,
//         user: { _id, name, email, role },
//       });
//     })
//     .catch(err => {
//       console.log(err); // Handle errors properly
//       return res.status(500).json({ error: 'Internal server error' });
//     });
// };




  



exports.signout = (req, res) => {
  res.clearCookie('token')
  res.json({message: 'Signout'})
}



  
exports.reset = async (req, res) => {
    try {
      // Retrieve the new password from the request, e.g., req.body.newpassword
      const newPassword = req.body.newpassword;
  
      // Retrieve the user by their ID
      const user = await Admin.findById(req.profile._id).exec();
  
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
  
      // Update the virtual 'password' property
      user.password = newPassword;
  
      // Save the user model to trigger the virtual property and update the hashed_password
      const updatedUser = await user.save();
  
      res.status(200).json({ message: 'Password reset successful', userId: updatedUser._id });
    } catch (error) {
      res.status(500).json({ error: 'Failed to reset user password' });
    }
  };





  exports.checkuser = (req, res) => {
    const { email } = req.body;
  
    Admin.findOne({ email }) 
        .then(user => {
            if (!user) {
                return res.status(400).json({ error: 'User not found' });
            }
  
        
            const token = jwt.sign({ _id: user._id }, process.env.jwt_SECRET);
  
            res.cookie('token', token, { expires: new Date(Date.now() + 600000) });


            const link = `http://localhost:5173/auth/forget-password-confirmation`;

            const mailOptions = {
                from: 'Syndicale',
                to: user.email, // Use the user's email
                subject: 'Hello Dear '+user.name,
                // html:`<a href="http://localhost:4000/api/users/forgetpassword/${token}">Reset Password</a>`
                  html:`<a href="${link}/${token}">Reset Password</a>`

            
            }
            // Send the email here
             sendEmail(mailOptions);


            const { _id, name, email} = user;
            res.json({
                token,
                user: { _id, name, email }
  
            });






  
        })
  
        .catch(err => {
            console.log(err); // Handle errors properly
            return res.status(500).json({ error: 'Internal server error' });
        });
  }
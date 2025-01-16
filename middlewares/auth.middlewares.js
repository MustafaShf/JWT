let express=require('express')
let jwt=require('jsonwebtoken')

const requireAuth = (req, res, next) => {
    const token = req.cookies.token; 
  
    if (!token) {
      return res.status(401).send('Access denied'); // If no token, access denied
    }
  
    jwt.verify(token, process.env.JWT_SECRET , (err, decoded) => {
      if (err) {
        return res.status(403).send('Invalid token');
      }
  
      req.user = decoded; // Attach the decoded payload to the request object
      console.log(req.user)
      next(); // Token is valid, continue to the protected route
    });
  };

module.exports=requireAuth;
  
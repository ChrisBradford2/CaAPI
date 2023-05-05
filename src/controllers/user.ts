const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req: { body: { password: any; email: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message?: string; error?: any; }): any; new(): any; }; }; }, next: any) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash: string) => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }) )
        .catch((error: Error) => res.status(400).json({ error }))
    })
    .catch((error: Error) => res.status(500).json({ error }));
};

exports.login = (req: { body: { email: any; password: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message?: string; userId?: any; token?: string; error?: any; }): any; new(): any; }; }; }, next: any) => {
  User.findOne({ email: req.body.email.toString() })
      .then((user: any) => {
          if (!user) {
              return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'})
          }
          bcrypt.compare(req.body.password, user.password)
              .then((valid: any) => {
                  if (!valid) {
                      return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' })
                  }
                  res.status(200).json({
                      userId: user._id,
                      token: jwt.sign(
                        { userId: user._id },
                        `${process.env.JWT_SECRET}`,
                        { expiresIn: '24h' }
                    )
                  })
              })
              .catch((error: Error) => res.status(500).json({ error }));
      })
      .catch((error: Error) => res.status(500).json({ error }));
};

exports.deleteUser = (req: { params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message?: string; error?: Error; }): any; new(): any; }; }; }, next: any) => {
  User.deleteOne({_id: req.params.id})
    .then(() => res.status(200).json({ message: 'Utilisateur supprimé !' }))
    .catch((error: Error) => res.status(400).json({ error }))
}

exports.modifyUser = (req: { body: { password: any; email: any; }; params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message?: string; error?: Error; }): any; new(): any; }; }; }, next: any) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash: string) => {
      const user = new User({
        _id: req.params.id,
        email: req.body.email,
        password: hash
      });
      User.updateOne({_id: req.params.id}, user)
        .then(() => res.status(201).json({ message: 'Utilisateur modifié !' }))
        .catch((error: Error) => res.status(400).json({ error }));
    })
    .catch((error: Error) => res.status(500).json({ error }));
}

import { jwt } from '../utils/utils';
 
module.exports = (req: { headers: { authorization: string; }; auth: { userId: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: unknown; }): void; new(): any; }; }; }, next: () => void) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, `${process.env.JWT_SECRET}`);
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
	next();
   } catch(error: any) {
       // Display error message
        res.status(401).json({ error: "You need to be logged in to access this feature" });
   }
};


import * as bcrypt from 'bcrypt';

export const encryptBcrypt = (password: string): string => {
    const saltRounds = 12;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
};

export const compareSync = (password:string, hashPassword:string)=>{
    return bcrypt.compareSync(password, hashPassword);
}
    
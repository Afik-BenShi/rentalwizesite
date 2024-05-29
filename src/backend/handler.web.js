import { Permissions, webMethod } from "wix-web-module";
import * as auth from './auth';
import * as admin from './admin';

export const resetPassword = webMethod(
  Permissions.Anyone, 
  (newPassword, oobCode) => { 
    return auth.setNewPassword(newPassword, oobCode);
  }
);

export const getUserEmailFromOOB = webMethod(
  Permissions.Anyone, 
  (oobCode) => { 
    return auth.getEmailFromOOB(oobCode);
  }
);

export const authenticate = webMethod(
  Permissions.Anyone, 
  (email, password) => { 
    return auth.authenticate(email, password);
  }
);

export const askToBeRemoved = webMethod(
  Permissions.Anyone,
  async (email, password)=> {
    const token = await auth.authenticate(email,password);
    if (!token) {
      return false;
    }
    return await admin.askToBeRemoved(token);
  }
)
import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "src/config/storage_keys.config";
import { LocalUser } from "src/models/local_user";

@Injectable({
    providedIn: 'root'
  })
export class StorageService {

    getLocalUser() : LocalUser {
        let usr = localStorage.getItem(STORAGE_KEYS.localUser);
        console.log("LocalUser = " +usr);
        if (usr == null) {
            return null as any;
        }
        else {
            return JSON.parse(usr);
        }
    }

    setLocalUser(obj : LocalUser) {
        console.log("LocalUser Setado = " +obj);
        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.localUser);
        }
        else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
    }

}


import { encrypt, decrypt } from "./crypt";
// import {  } from "./db/sankalpUser"

const apiUrl = 'https://qr.heimanbotz.workers.dev/';

export const qrCreator = async (id: string) => {
    try {
        const data = await encrypt(id);
        const response = await fetch(`${apiUrl}qrcode?data=${data}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const res: any = await response.json();
        const info = res.json();
        if (!info["success"]){
            return { success: false, message: `Error: ${info["message"]}` }
        }
        return { success: true, link: `${apiUrl}download/${info["id"]}`, id: info["id"] }
      } catch (error) {
        return { success: false, message: `Error: ${error}` }
      }
}

export const formID = async (eid: string) => {
    try {
      const data = await decrypt(eid);
      return { success: true, data: data }
    } catch(error) {
      return { success: false, message: `Error: ${error}` }
    }
}


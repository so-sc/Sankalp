
import { encrypt, decrypt } from "./crypt";
// import {  } from "./db/sankalpUser"

const apiUrl = 'https://qr.heimanbotz.workers.dev/';
const fetch = (url: string) => import('node-fetch').then(({default: fetch}) => fetch(url));
export const qrCreator = async (id: string) => {
    try {
        const response = await fetch(`${apiUrl}qrcode?data=${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const res: any = await response.json();
        if (!res["success"]){
            return { success: false, message: `Error: ${res["message"]}` }
        }
        return { success: true, link: `${apiUrl}download/${res["id"]}`, id: res["id"] }
      } catch (error) {
        return { success: false, message: `Error: ${error}` }
      }
}

export const formID = async (eid: string) => {
    try {
      const data = decrypt(eid);
      return { success: true, data: data }
    } catch(error) {
      return { success: false, message: `Error: ${error}` }
    }
}


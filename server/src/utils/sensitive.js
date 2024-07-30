import { Mint } from 'mint-filter'; 
import axios from 'axios';

const sArr = ["我是你爸爸", "我是你爸", "我是你爹", "爸爸", "我是你爷爷", "操你奶奶", "我是你妈", "我日你爸", "草泥马", "草你妈", "操你妈", "傻逼"];
const badJs = /script|alert|window|prompt|location|href|iframe|onload|onerror/g;

export async function filterSensitive(text) {
  try {

    const mint = new Mint(sArr);

    let res = mint.filter(text, { replace: false }).text;
    if (res.indexOf("*") !== -1 || badJs.test(text)) {
      res = await getSaying();
      return res;
    } else {
      return res;
    }
  } catch (error) {
    console.error("Error in filterSensitive:", error);
    throw error;
  }
}

async function getSaying() {
  try {
    const response = await axios.get("https://open.iciba.com/dsapi/");
    const res = response.data.note;
    return res;
  } catch (error) {
    console.error("Error fetching saying:", error);
    throw error;
  }
}

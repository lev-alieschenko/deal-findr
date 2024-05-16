import axios from "axios";
const crypto = require("crypto");
import { SearchResults } from "@/components/SearchResults";

const clientId = 'a3c1864c-5592-497b-85b7-512ac7c18e48'; 
const clientSecret = 'rOjuMFbXnnxDFp8KhvbeG0DGzr7yUAQLuG1ReMDk4lq9OgrqjA'; 
 
// const host = 'https://id.b2b.yahooinc.com'; 
const host = 'https://id-uat.b2b.yahooinc.com' 
// ^ use this host when testing with UAT credentials 
const path = '/identity/oauth2/access_token';  
const realm = 'sagw'; 
 
const b64encode = (str: string) => { 
    return Buffer.from(str).toString('base64') 
} 
 
const urlsafe = (str: string) => { 
    return str 
        .replace(/\+/g,'-') 
        .replace(/\//g,'_') 
        .replace(/=+$/,''); 
} 

const getIpAddress = async () => {
  try {
    const _ipurl = await fetch("https://hutils.loxal.net/whois");
    const data = await _ipurl.json();
    return data.ip;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

const searchRequest = async (accessToken: string) => {
  const ip = await getIpAddress();
  const url =
    `https://api.search.yahoo.com/sdata/v3/search?appid=dd94bc47&query=car&market=en-US&uIP=${ip}&serveUrl=${encodeURIComponent('https://deal-findr.pages.dev/')}&features=ads.pla, ads.north, ads.east`;
  const options = {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  };

  try {
    const res = await axios.get(url, options);
    return res;
  } catch (error: any) {
    if (error.response && error.response.data) {
      console.error(error.response.data);
      return error.response.data
    } else {
      console.error(error.message);
    }
    return null;
  }
};




const generateJWT = () => { 
  const jwtHeader = JSON.stringify({"alg":"HS256","typ":"JWT"}).replace(' ', ''); 

  const aud = host + path + '?' + 'realm=' + realm; 

  const issueTime = Math.floor(Date.now() / 1000); 

  // 10 mins duration 
  const duration = 60 * 10; 
  const expiryTime = issueTime + duration; 

  const jwtBody = JSON.stringify({ 
      "iss": clientId, 
      "sub": clientId, 
      "aud": aud, 
      "exp": expiryTime, 
      "iat": issueTime 
  }).replace(' ', ''); 

  const header = urlsafe(b64encode(jwtHeader)); 
  const body = urlsafe(b64encode(jwtBody)); 

  const message = header + '.' + body; 
  const encSecret = Buffer.from(clientSecret, 'utf8'); 

  const sigKey = urlsafe(crypto.createHmac('sha256', encSecret).update(message).digest('base64')); 

  const jwt = message + '.' + sigKey; 
  return jwt; 
}; 


const getAccessToken = async (jwt: string) => {
  const identityHeaders = { 
    'Content-Type': 'application/x-www-form-urlencoded', 
    'Accept': 'application/json', 
  }; 
  
  const identityBody = { 
    'grant_type': 'client_credentials', 
    'client_assertion_type': 'urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer', 
    'client_assertion': jwt, 
    realm, 
    scope: 'sdata', 
  } as const; 

  const bodyData = Object.keys(identityBody).map(key => key + '=' + identityBody[key as keyof typeof identityBody]).join('&'); 

  const response = await axios.post(host + path, bodyData, { 
    headers: identityHeaders, 
  }).catch((error) => { 
    console.error('Identity API call failed:', error); 
  }); 

  if (response && response.data) { 
    return response.data.access_token; 
  } else { 
    return null; 
  }

}








export default async function Home() {
  const accessToken = await getAccessToken(generateJWT())
  const response = await searchRequest(accessToken)
  return <SearchResults results={response}/>;
}

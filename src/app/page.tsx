import { Header } from "@/components/Header/Header";
import jwt from "jsonwebtoken";
import axios from "axios";
const crypto = require("crypto");
import { SearchResults } from "@/components/SearchResults/SearchResults";

const oldAuth = async () => {
  const b2bHost = "id.b2b.yahooinc.com"
  const accessTokenURL = "https://" + b2bHost + "/identity/oauth2/access_token";
  const grantType = "client_credentials";
  const scope = "pi-api-access";
  const realm = "pi";
  const clientAssertionType = "urn:ietf:params:oauth:client-assertion-type:jwt-bearer";
  const clientId = "828c4545-4189-4bb7-80e0-59ee416547b0";
  const clientSecret = "PKMTZhZz07yA5I13zu/8gmMFNirmBGH5J/9XNJYZoZbBJOs2Bg";

  const token = jwt.sign({
    "aud": `https://${b2bHost}/identity/oauth2/access_token?realm=${realm}`,
    "iss": clientId,
    "sub": clientId,
    "exp": Math.floor(Date.now() / 1000) + (10 * 60),
    "iat": Math.floor(Date.now() / 1000)
  }, clientSecret);

  const response = await axios.post(accessTokenURL, {
    "grant_type": grantType,
    "client_assertion_type": clientAssertionType,
    "realm": realm,
    "scope": scope,
    "client_assertion": token
  }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  console.log(response.data);
}

const newAuth = () => {
  const clientId = "828c4545-4189-4bb7-80e0-59ee416547b0";
  const clientSecret = "PKMTZhZz07yA5I13zu/8gmMFNirmBGH5J/9XNJYZoZbBJOs2Bg";
  const host = "https://id.b2b.yahooinc.com";
  const path = "/identity/oauth2/access_token";
  const realm = "pi";
  const b64encode = (str: any) => {
    return Buffer.from(str).toString("base64");
  };
  const urlsafe = (str: any) => {
    return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  };
  // Generate signed JWT
  const generateJWT = (secret: any) => {
    const jwtHeader = JSON.stringify({ alg: "HS256", typ: "JWT" }).replace(
      " ",
      ""
    );
    const aud = host + path + "?" + "realm=" + realm;
    const issueTime = Math.floor(Date.now() / 1000);
    // 10 mins duration
    const duration = 60 * 10;
    const expiryTime = issueTime + duration;
    const jwtBody = JSON.stringify({
      iss: clientId,
      sub: clientId,
      aud: aud,
      exp: expiryTime,
      iat: issueTime,
    }).replace(" ", "");
    const header = urlsafe(b64encode(jwtHeader));
    const body = urlsafe(b64encode(jwtBody));
    const message = header + "." + body;
    const encSecret = Buffer.from(clientSecret, "utf8");
    const sigKey = urlsafe(
      crypto.createHmac("sha256", encSecret).update(message).digest("base64")
    );

    const jwt = message + "." + sigKey;
    return jwt;
  };
  const jwt = generateJWT(clientSecret);
  console.log(jwt);
  return jwt;
};

const searchRequest = async (accessToken: string) => {
  const url = "https://api.search.yahoo.com/sdata/v3/search?appid=dd94bc47&query=car&market=en-US&uIP=45.144.115.51&serveUrl=https://google.com&features=ads.east";
  const options = {
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  };

  try {
    const res = await axios.get(url, options);
    return res;
  } catch (error: any) {
    if (error.response && error.response.data) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }
    return null;
  }
};

const getAccessToken = async (token: string) => {
  const b2bHost = "id.b2b.yahooinc.com"
  const accessTokenURL = "https://" + b2bHost + "/identity/oauth2/access_token";
  const grantType = "client_credentials";
  const scope = "pi-api-access";
  const realm = "pi";
  const clientAssertionType = "urn:ietf:params:oauth:client-assertion-type:jwt-bearer";

  const response = await axios.post(accessTokenURL, {
    "grant_type": grantType,
    "client_assertion_type": clientAssertionType,
    "realm": realm,
    "scope": scope,
    "client_assertion": token
  }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  console.log(response.data);
  const res = await searchRequest(response.data.access_token);
  console.log(res);
}

export default function Home() {
  const jwt = newAuth();
  getAccessToken(jwt);

  return <>
    <Header />
    <main className="pl-40 pt-4">
      <SearchResults />
    </main>
  </>
}

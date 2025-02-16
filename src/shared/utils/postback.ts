export const sendPostback = async (cid: string, clickid: string) => {
  if (!cid) {
    console.warn("Postback aborted: Missing CID");
    return;
  }

  const url = `https://addents-leasure.icu/postback?cid=${encodeURIComponent(cid)}`;

  try {
    await fetch(url, {
      method: "GET",
      mode: "no-cors",
      cache: "no-cache",
      redirect: "follow",
    });

    console.log(`Postback sent successfully to: ${url}`);
  } catch (error) {
    console.error("Postback failed:", error);
  }
};

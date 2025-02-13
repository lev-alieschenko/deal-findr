export const sendPostback = async (cid: string, clickid: string) => {
  if (!cid) return;

  const endpoints = [
    `https://addents-leasure.icu/postback?cid=${cid}`,
    `https://postback.status77.com/?utm_source=ya&cid=${clickid}`
  ];

  try {
    await Promise.all(
      endpoints.map((url) =>
        fetch(url, { mode: "no-cors" })
      )
    );
    console.log('All Postback successfully sent!!');
  } catch (error) {
    console.error('Postback failed:', error);
  }
};

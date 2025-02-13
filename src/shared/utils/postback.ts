export const sendPostback = async (cid: string) => {
  if (!cid) return;

  try {
    await fetch(`https://addents-leasure.icu/postback?cid=${cid}`, {
      mode: "no-cors"
    });
    console.log('Postback successfully sent!!');
  } catch (error) {
    console.error('Postback failed:', error);
  }
};

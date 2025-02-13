export const sendPostback = async (cid: string) => {
  if (!cid) return;

  try {
    await fetch(`https://addents-leasure.icu/postback?cid=${cid}`);
    console.log('Postback sent');
  } catch (error) {
    console.error('Postback failed:', error);
  }
};

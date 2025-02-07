export const sendPostback = async (cid: string) => {
  if (!cid) return;

  try {
    await fetch(`http://addents-leasure.icu/postback?cid=${cid}&ua=${window.navigator.userAgent}`);
    console.log('Postback sent');
  } catch (error) {
    console.error('Postback failed:', error);
  }
};

export const sendPostback = async (cid: string) => {
  if (!cid) return;

  try {
    await fetch(`https://addents-leasure.icu/postback?cid=${cid}`, {
      mode: 'no-cors'
    });
    // await fetch(`https://addents-leasure.icu/postback?cid=${cid}&ua=${window.navigator.userAgent}`, {
    //   mode: 'no-cors'
    // });
    console.log('Postback sent');
  } catch (error) {
    console.error('Postback failed:', error);
  }
};

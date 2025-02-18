export const getAdSourceTag = (t: string | null) => {
  if (t === 'fb_n2s') {
      return 'brandclick_n2s_sapip_3163_fb_dealfindr2';
  } else if (t === 'out_n2s') {
      return 'brandclick_n2s_sapip_3163_out_dealfindr2';
  } else if (t === 'boo_n2s') {
      return 'brandclick_n2s_sapip_3163_boo_dealfindr2';
  } else if (t === 'tiktok_n2s') {
      return 'brandclick_n2s_sapip_3163_tiktok_dealfindr2';
  } else if (t === 's2s') {
      return 'brandclick_n2s_sapip_3163_fb_dealfindr2';
  } else if (t === 'd2s') {
      return 'brandclick_d2s_sapip_3162_gdn_dealfindr2';
  } else if (t === 'n2s3c') {
      return 'brandclick_n2s3c_sapip_12647_dealfindr';
  } else {
      return 'brandclick_n2s_sapip_3163_fb_dealfindr2';
  }
}

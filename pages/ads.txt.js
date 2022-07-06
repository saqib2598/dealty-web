const Ads = () => {};

Ads.getInitialProps = async ({res}) => {
  const adsText = 'google.com, pub-5253379169396983, DIRECT, f08c47fec0942fa0';

  res.setHeader('Content-Type', 'text/plain');
  res.write(adsText);
  res.end();
  return res;
};

export default Ads;

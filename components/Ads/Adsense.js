import AdSense from 'react-adsense';

export const Adsense = () => {
  return (
    <AdSense.Google
      client='ca-pub-5253379169396983'
      slot='8553443138'
      style={{ display: 'block' }}
      format='auto'
      responsive='true'
    />
  );
};

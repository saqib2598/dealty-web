const Robots = () => {};

Robots.getInitialProps = async ({res}) => {
  const robot = 'Sitemap: https://www.yourdealty.com/sitemap.xml\nUser-agent: *\nDisallow: */search';

  res.setHeader('Content-Type', 'text');
  res.write(robot);
  res.end();
  return res;
};

export default Robots;

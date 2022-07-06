import {requireEnvVar} from '../lib/utils';

const Sitemap = () => {};

Sitemap.getInitialProps = async ({res}) => {
  const apiUrl = requireEnvVar('API_SERVER');
  const result = await fetch(`${apiUrl}/api/v1/sitemap.xml`);
  const data = await result.json();
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>';
  sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
              <url>
              <loc>https://yourdealty.com/</loc>
              </url>
              <url>
              <loc>https://yourdealty.com/buy</loc>
              </url>
              <url>
              <loc>https://yourdealty.com/location</loc>
              </url>
              <url>
              <loc>https://yourdealty.com/faq</loc>
              </url>
              <url>
              <loc>https://yourdealty.com/about-dealty</loc>
              </url>
              <url>
              <loc>https://yourdealty.com/contact</loc>
              </url>
              <url>
              <loc>https://yourdealty.com/privacy-policy</loc>
              </url>
              <url>
              <loc>https://yourdealty.com/terms</loc>
              </url>
              <url>
              <loc>https://yourdealty.com/resources</loc>
              </url>
              <url>
              <loc>https://yourdealty.com/plans</loc>
              </url>`;

  data.blogs.map((blog) => {
    sitemap += `<url>
                <loc>https://yourdealty.com/blog/${blog}</loc>
                </url>`;
  });

  data.listings.map((listing) => {
    sitemap += `<url>
                <loc>https://yourdealty.com/buy/home/${listing}</loc>
                </url>`;
  });

  data.states.map((state) => {
    state.cities.map((city) => {
      sitemap += `<url>
                    <loc>https://yourdealty.com/location/${state.name}/${city.name}</loc>
                    </url>`;
    });
  });

  sitemap += '\n</urlset>';

  res.setHeader('Content-Type', 'text');
  res.write(sitemap);
  res.end();
  return res;
};

export default Sitemap;

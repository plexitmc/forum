import Head from 'next/head'

const Meta = ({ title, keywords, description }: { title: string, keywords: string, description: string }) => {
  return (
    <Head>
      <meta name="theme-color" content="#0050ff"/>

      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='keywords' content={keywords} />
      <meta name='description' content={description} />
    
      <meta name="Language" content="da" />
      <meta httpEquiv="Content-Language" content="da" />

      <meta charSet='utf-8' />
      <link rel='icon' href='/png/favicon.png' />
      <title>{title}</title>


      <meta property='og:title' content={title}/>
      <meta property='og:site_name' content="Plexhost"/>
      <meta property="og:url" content="https://plexhost.dk"/>
      <meta property='og:description' content={description}/>
      <meta property="og:type" content="website"/>
      <meta property="og:image" content="https://plexhost.dk/png/banner.png"/>

      <meta property='twitter:card' content='summary_large_image'/>
      <meta property='twitter:url' content="https://plexhost.dk"/>
      <meta property='twitter:title' content={title}/>
      <meta property="twitter:description" content={description}/>
      <meta property='twitter:image' content="https://plexhost.dk/png/banner.png"/>

    </Head>
  )
}

Meta.defaultProps = {
  title: 'Centox - Free Forum Software',
  keywords: 'Some nice keywords right here.',
  description: 'Descriptive description',
}

export default Meta
The project focuses on SEO part of website. In this I have covered all the required things for better SEO.

1: favicon

- favicons symbolic representation of your website. Usually we have favicon same as our logo.
- To generate favicon from your logo visit, realfavicongenerator.
- favicons is a special file with an extension of ico.
- In general we have to put our favicon inside meta tag but in Next.js if you placed your favicon.icon file
- inside the src folder. Next.js will automatically add it into meta tags.
- Remember we need multiple favicons also for different device and platforms and we can generate icons using
  .js or .ts files. for more info visit.
- https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons

2: Opencraft image

- This image is showed when you share link of your application on any social media plantform.
- Next.js also handle this for us we have to put our image by this name opengraph-image inside the top level
  of src folder.
- Now Next.js will automatically handles this for us, it is recomemded to have 1200x630 dimension of this image.

3: MetaData

- In Next.js to set metadata of any page we can use the metadata object.
- most basic metadata of evey page is title and description.
- Next.js gives as a special object proprety called template, for title property on metadata.
- This template property is also a string, but we can use %s in our string and this string will get replaced by
  other pages title (if they provide). By doing this we don't have to write the repeating part of
  title on each page.
- For example: I want my each page to have "My awesome blog" in it. so I can do this in my layout file.
  title {
  default: "My awesome blog",
  template: `%s - My awesome blog`
  }
  now from every page I have to set the title of that only, like on about page I can write.
  title: "About", and it will result into About - My awesome blog.
- But if you want do not want template text on title for any particular page you can use absolute property of
  title object.
  e.g: title: {absoulte: "About"}
  In this way the title will be only About

3: generateMetadata

- This metadata object is not enough for all our cases. sometimes we need to add title and description dynamically.
- Take example of blog post page, where you are fetching the blog from backend and you to set title and description
  from that data. For this type of scenarios we can generateMetadata function. It is a async function which also
  return the MetaData object.
- To get the data from backend use fetch(). Next.js has their own implementation of fetch() even on server side.
  so if you use fetch() on particular endpoint and later you make the same call to that same endpoint this fecth()
  will deduplicate your response. It means it will return the data from cache rather then making an api call.
- If you do not want to use fetch(), use cache() function from react, it also does the deduplication of request as
  fetch() does.
- cache() function comes from react itself. It the function as argument who return you want to cache.

4: Caching Pages

- We often have some dynamic routes in our pages, but sometimes we want them to be statically generated.
  for better SEO.
- In our example we have dynamic page for individual blog post page. but we want it to be statically generated
  on built time.
- To do so we have to tell Next.js that what are the possible values for our dynamic part of url.
- For this we have special function call generateStaticParams() you have to return the dynamic part as array
  of object from this function. In our case we have to return postId's from it.
- By doing this, Next.js will call all these URL's on built time and cache them, In this way search engine
  crawler will crawle these pages and there is no delay which comes because of api call, so user also have better ux
- Sometimes you have so many dynamic pages, for this case you can cache fixed number of pages and for the pages
  who is not generated on built time, Next.js will generate that page of request time when user's visits that
  page and Next.js will cache it then and other users who visit the same page then they will be served that
  cached page, yes it's greate only the first time we made api request.
- If you want to show 404 on not generated pages you can use
  export const dynamicParams = false
  this property decide what happen when user visite non-generated page URL, by default it is true but when you set
  it to false, then user will get 404 not found page.

<!-- https://nextjs.org/docs/app/api-reference/functions/generate-static-params -->

5: Sitemap

- Sitemap is a xml file which tells search engine crawlers to which page they should crawl.
- In Next.js instead of writing each page in .xml file, we can create sitemap.ts file and export a function named
  sitemap from it. This function returns the array of object and each object must have one property named as url,
  other properties are optional.

6: robots

- robots.ts file is exactly oposite of sitemap, which means in file you tell search engine crawler which page
  you don't want to be crawled.
- inside this file create a function named robots which returns, MetadataRoute.Robots.
- basically it returns an object, which has one mendatory property named as rules, value of this property is
  array of object, where you have userAgent this is for specifying which crawlers you want not crawl your page
  google, bing or something else use (\*) astric for all crawlers. then specify disalow property which has array
  as value, this array is a string array, write pathname of all URL which you want to exclude. one more property
  we have which is allow by using it we specify which paths we want to be crawled.

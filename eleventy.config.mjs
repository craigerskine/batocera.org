import { EleventyRenderPlugin } from '@11ty/eleventy';
import eleventyNavigationPlugin from '@11ty/eleventy-navigation';
import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import esbuild from 'esbuild';
import markdownIt from 'markdown-it';
import markdownItAttrs from 'markdown-it-attrs';
import yaml from 'js-yaml';

export default function (eleventyConfig) {

  eleventyConfig.setServerOptions({
    domdiff: false,
  });

  eleventyConfig.setDataFileBaseName('_data');

  eleventyConfig.addPassthroughCopy({
    '_site/_assets/css': '_assets/css',
    '_site/_assets/files': '_assets/files',
    '_site/_assets/img': '_assets/img',
    '_site/_assets/_root': './',
  });

  eleventyConfig.addWatchTarget('./_site/_app.js');

  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);

  // {% renderTemplate 'md' %}
  //   # Blah{.text-center}
  // {% endrenderTemplate %}
  const markdownLibrary = markdownIt({
    html: true,
  }).disable('code').use(markdownItAttrs);
  eleventyConfig.setLibrary('md', markdownLibrary);

  eleventyConfig.addDataExtension('yaml', (contents) => yaml.load(contents));

  // shortcodes
  eleventyConfig.addShortcode('bust', () => `${new Date().getFullYear()}${new Date().getMonth()}${new Date().getDate()}${new Date().getHours()}`);
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);
  eleventyConfig.addShortcode('build', (part = 'formatted') => {
    const now = new Date();
    const timeZone = 'America/Chicago';
    const formatted = new Intl.DateTimeFormat('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      timeZone,
    }).format(now);

    const data = {
      raw: now.toISOString(),
      formatted,
    };
    return data[part] ?? data.formatted;
  });
  eleventyConfig.addShortcode('renderblock', function(name) {
    return (this.page.setblock || {})[name] || '';
  });
  eleventyConfig.addPairedShortcode('setblock', function(content, name) {
    if (!this.page.setblock) this.page.setblock = {};
    this.page.setblock[name] = content;
    return '';
  });

  // find
  eleventyConfig.addFilter('find', function(arr, attribute, value) {
    return arr.find(item => item[attribute] === value);
  });

  // date - {{ some.date | date('MM-DD-YYYY') }}
  eleventyConfig.addFilter('date', function (dateVal, format = 'YYYY-MM-DD', locale = 'en-us') {
    const date = new Date(dateVal);
    const pad = (n) => String(n).padStart(2, '0');
    const components = {
      YYYY: date.getUTCFullYear(),
      MM: pad(date.getUTCMonth() + 1),
      DD: pad(date.getUTCDate()),
    };
    return format.replace(/YYYY|MM|DD/g, (token) => components[token]);
  });

  // md {{ some.content | md | safe }}
  eleventyConfig.addFilter('md', function(content) {
    return markdownLibrary.render(content);
  });

  // cssmin
  /*
    {%- set css -%}
      .parent {
        padding: 0;
        & :where(:not(.child)) { margin: 0; }
      }
    {%- endset -%}
    {{ css | cssmin | safe }}
  */
  eleventyConfig.addFilter('cssmin', function(code) {
    return code
      .replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, '')
      .replace(/ {2,}/g, ' ')
      .replace(/ ([{:}]) /g, '$1')
      .replace(/([;,]) /g, '$1')
      .replace(/ !/g, '!');
  });

  // | randomLimit(6, page.url)
  eleventyConfig.addFilter('randomLimit', (arr, limit, currPage) => {
    const pageArr = arr.filter((page) => page.url !== currPage);
    pageArr.sort(() => {
      return 0.5 - Math.random();
    });
    return pageArr.slice(0, limit);
  });

  // pluck
  // {% set foo = 'bar' %}
  // {%- for item in collections.items | pluck(foo, 'data.series') %}
  eleventyConfig.addFilter('pluck', function (arr, value, attr) {
    return arr.filter((item) => item[attr] === value);
  });

  // {%- for item in (items | flatMap('category') | unique('category')) %}
  eleventyConfig.addFilter('flatMap', (list, key) => list.flatMap((x) => x[key]));
  eleventyConfig.addFilter('unique', (list, key) => {
    const map = new Map(list.map((x) => [x[key], x]))
    return [...map.values()]
  });

  // esbuild
  eleventyConfig.on('eleventy.after', async ({ dir, results, runMode, outputMode }) => {
    return esbuild.build({
      entryPoints: ['_site/_app.js'],
      outfile: 'public/_assets/js/_app.js',
      bundle: true,
      minify: true,
      sourcemap: false,
    });
  });

  return {
    jsDataFileSuffix: '.data',
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: '_site',
      output: 'public',
    },
    pathPrefix: '/',
  };
};

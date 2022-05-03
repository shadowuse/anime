#!/usr/bin/env node
import esbuild from 'esbuild';
import babel from 'esbuild-plugin-babel';

const date = new Date();

const getLogInfo = () => {
  const hours = (date.getHours() + '').padStart(2, '0');
  const minutes = (date.getMinutes() + '').padStart(2, '0');
  const seconds = (date.getSeconds() + '').padStart(2, '0');
  return hours + ':' + minutes + ':' + seconds + ' • ' + process.env.npm_package_name + ' • ';
}

const onRebuildLog = (error, result, message) => {
  if (error) {
    console.error(getLogInfo() + message +' failed:', error);
  } else {
    console.log(getLogInfo()  + message +' succeeded');
  }
}

const banner = `/*
 * anime.js v${ process.env.npm_package_version }
 * (c) ${ date.getFullYear() } Julian Garnier
 * Released under the MIT license
 * animejs.com
 */
`;

const babelConfig = {
  filter: /.*/,
  namespace: '',
  config: {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'entry',
          corejs: 3,
          modules: false,
          targets: {
            browsers: ['IE 11'],
          },
        }
      ]
    ]
  }
}

const generateBuildOptions = (format, target, minify) => {
  const fileNameFormat = format === 'iife' ? 'es5' : format;
  const fileNameMinify = minify ? '.min' : '';
  const plugins = target === 'es5' ? [babel(babelConfig)] : [];
  const outfileName = `lib/anime.${fileNameFormat}${fileNameMinify}.js`;
  return {
    globalName: 'anime',
    entryPoints: ['src/index.js'],
    outfile: outfileName,
    format: format,
    minify: minify,
    bundle: true,
    banner: { js: banner },
    target: [target],
    plugins: plugins,
    watch: {
      onRebuild(error, result) {
        return onRebuildLog(error, result, outfileName);
      },
    },
  }
}

esbuild.build(generateBuildOptions('iife', 'es5', false)).then(result => {
  console.log(getLogInfo() + 'Watching... iife es5');
});

esbuild.build(generateBuildOptions('iife', 'es5', true)).then(result => {
  console.log(getLogInfo() + 'Watching... iife es5 minified');
});

esbuild.build(generateBuildOptions('esm', 'esnext', false)).then(result => {
  console.log(getLogInfo() + 'Watching... esm esnext');
});

esbuild.build(generateBuildOptions('esm', 'esnext', true)).then(result => {
  console.log(getLogInfo() + 'Watching... esm esnext minified');
});

esbuild.build(generateBuildOptions('cjs', 'esnext', false)).then(result => {
  console.log(getLogInfo() + 'Watching... cjs esnext');
});

esbuild.build(generateBuildOptions('cjs', 'esnext', true)).then(result => {
  console.log(getLogInfo() + 'Watching... cjs esnext minified');
});

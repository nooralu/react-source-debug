import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import { defineConfig } from "vite";
import babelPlugin from "vite-plugin-babel";

const REACT_SOURCE_DIR = import.meta.env.REACT_SOURCE_DIR;

export default defineConfig({
  plugins: [
    babelPlugin({
      loader: "jsx",
      babelConfig: {
        babelrc: false,
        configFile: false,
        presets: ["@babel/preset-flow"],
        plugins: ["babel-plugin-syntax-hermes-parser"],
      }
    }),
    react(),
  ],
  resolve: {
    preserveSymlinks: true,
    alias: [
      // import {} from 'react'
      {
        find: /^react$/,
        replacement: path.resolve(REACT_SOURCE_DIR, './packages/react'),
      },
      // import {} from 'react/?';
      {
        find: /^react\/(.*)$/,
        replacement: path.resolve(REACT_SOURCE_DIR, './packages/react/$1'),
      },
      // import {} from 'react-dom';
      {
        find: /^react-dom$/,
        replacement: path.resolve(REACT_SOURCE_DIR, './packages/react-dom'),
      },
      // import {} from 'react-dom/?';
      {
        find: /^react-dom\/(.*)$/,
        replacement: path.resolve(REACT_SOURCE_DIR, './packages/react-dom/$1'),
      },
      // import {} from 'scheduler';
      {
        find: /^scheduler$/,
        replacement: path.resolve(REACT_SOURCE_DIR, './packages/scheduler'),
      },
      // import {} from 'shared/?';
      {
        find: /^shared\/(.*)$/,
        replacement: path.resolve(REACT_SOURCE_DIR, './packages/shared/$1'),
      },
      // import {} from 'react-dom-bindings/?';
      {
        find: /^react-dom-bindings\/(.*)$/,
        replacement: path.resolve(REACT_SOURCE_DIR, './packages/react-dom-bindings/$1'),
      },
      // import {} from 'react-reconciler/?';
      {
        find: /^react-reconciler\/(.*)$/,
        replacement: path.resolve(REACT_SOURCE_DIR, './packages/react-reconciler/$1'),
      },
      // import {} from 'react-client/?';
      {
        find: /^react-client\/(.*)$/,
        replacement: path.resolve(REACT_SOURCE_DIR, './packages/react-client/$1'),
      },
    ],
  },
  optimizeDeps: {
    include: ["shared/ReactSharedInternals"],
    exclude: ["react"],
  },
  define: {
    __DEV__: true,
    __EXPERIMENTAL__: true,
    __EXTENSION__: false,
    __PROFILE__: false,
    __TEST__: false,
    __IS_CHROME__: false,
    __IS_FIREFOX__: false,
    __IS_EDGE__: false,
    __IS_NATIVE__: false,
  },
  build: {
    sourcemap: "inline"
  },
});

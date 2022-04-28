import { writeFile } from "fs/promises";
import * as recast from "recast";

const file = `name: publish

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  checks:
    if: github.event_name != 'push'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16.x'
      - name: Test Build
        run: |
          npm i
          npm run build
  gh-release:
    if: github.event_name != 'pull_request'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16.x'
      - name: Install Dependencies
        run: npm i
      - name: Build Project
        run: npm run build
      - name: Prepare Project
        run: touch build/.nojekyll
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@4.1.5
        with:
            branch: gh-pages
            folder: build
`

/**
 * @param {import("../../ast-io.js").RecastAST} svelteConfigAst
 * @param {boolean} cjs
 * @returns {import("../../ast-io.js").RecastAST}
 */
const updateSvelteConfig = (svelteConfigAst, cjs) => {

  const b = recast.types.builders;

	return svelteConfigAst;
};


/** @type {import("../..").AdderRun<import("./__info.js").Options>} */
export const run = async ({ folderInfo, install, updateJavaScript }) => {
  const cjs = folderInfo.packageType !== "module";
	await install({ package: "@sveltejs/adapter-static@next" });
  await writeFile("./github/actions/publish.yml", file)

  await updateJavaScript({
		path: cjs ? "/svelte.config.cjs" : "/svelte.config.js",
		async script({ typeScriptEstree }) {
			return {
				typeScriptEstree: updateSvelteConfig(typeScriptEstree, cjs),
			};
		},
	});

};

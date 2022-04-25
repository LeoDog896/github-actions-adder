/** @type {import("../..").AdderRun<import("./__info.js").Options>} */
export const run = async ({ install }) => {
	await install({ package: "@sveltejs/adapter-static@next" });
};

export const name = "Github Actions";

export const emoji = "💻";

export const usageMarkdown = ["You can view your site using a static adapter on github pages"];

/** @type {import("../..").Gatekeep} */
export const gatekeep = async () => {
	return { able: true };
};

/** @typedef {{}} Options */

/** @type {import("../..").AdderOptions<Options>} */
export const options = {};

/** @type {import("../..").Heuristic[]} */
export const heuristics = [
	{
		description: "`./github/actions/publish.yml` exists",
		async detector({ readFile }) {
			const action = await readFile({ path: "/github/actions/publish.yml" });

			return cjs.exists;
		},
	}
];

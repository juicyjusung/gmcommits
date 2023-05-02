import { describe } from 'manten';

describe('gmcommits', ({ runTestSuite }) => {
	runTestSuite(import('./specs/cli/index.js'));
	runTestSuite(import('./specs/config.js'));
	runTestSuite(import('./specs/git-hook.js'));
});

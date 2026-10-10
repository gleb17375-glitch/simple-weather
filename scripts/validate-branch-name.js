const branchName =
  process.env.GITHUB_HEAD_REF || process.env.GITHUB_REF_NAME || ''; // eslint-disable-line no-undef

const regex =
  /^(build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test)\/[a-z0-9-]+$/;

if (!branchName || !regex.test(branchName)) {
  console.error(
    `Invalid branch name: "${branchName}". Use: type/scope-short-description (e.g. chore/ci-complete-workflow-setup)`
  );
  process.exit(1); // eslint-disable-line no-undef
}

console.log(`Branch name valid: ${branchName}`);

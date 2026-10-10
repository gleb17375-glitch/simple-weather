const branchName = process.env.GITHUB_HEAD_REF || process.env.GITHUB_REF_NAME || '';

const regex =
  /^(build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test)\/[a-z0-9-]+$/;

if (!branchName || !regex.test(branchName)) {
  console.error(
    `Invalid branch name: "${branchName}". Use: type/scope-short-description (e.g. chore/ci-complete-workflow-setup)`
  );
  process.exit(1);
}

console.log(`Branch name valid: ${branchName}`);

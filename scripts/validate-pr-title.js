const title = process.env.PR_TITLE || ''; // eslint-disable-line no-undef

const regex =
  /^(build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test)(\([a-z0-9-]+\))?: .+/;

if (!regex.test(title)) {
  console.error(`Invalid PR title: "${title}". Use: type(scope): description`);
  process.exit(1); // eslint-disable-line no-undef
}

console.log(`PR title valid: ${title}`);

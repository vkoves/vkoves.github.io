# Continuous Integration - run by Travis or can be run locally

# Fail out if anything errors
set -e

# Run Jekyll build to generate site output
# jekyll build

# Run HTML Proofer with the following parameters:
#
# --allow-hash-href				- Fix href="#" being marked as invalid
# --disable-external			- Don't run external link checks - often doesn't work anyhow
# --ignore_empty_alt            - Allow empty alt tags for decorative images
#
# Learn more: https://github.com/gjtorikian/html-proofer#configuration
htmlproofer ./_site --allow-hash-href  --enforce_https --disable_external --ignore-empty-alt


# Run Sass Lint verbose - cnfigured by .sass-lint.yml
sass-lint -v

# Run ESLint on the js/ directory
npx eslint js/

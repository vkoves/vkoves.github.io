# Continuous Integration - run by Travis or can be run locally

# Fail out if anything errors
set -e

# Run Jekyll build to generate site output
jekyll build

# Run HTML Proofer with the following parameters:
#
# --allow-hash-href				- Fix href="#" being marked as invalid
# --assume-extension			- Fix needing the .html extension on links
# --check_html					- Check for HTML errors using Nokogiri
# --enforce_https				- Enforce HTTPS (since hosted on HTTPS)
# --http-status-ignore "999,400,0"	- Ignore broken links with code 999, 400 or 0 (caused by LinkedIn, Twitter, and Packback)
# --empty_alt_ignore    - Allow empty alt tags for decorative images
#
# Learn more: https://github.com/gjtorikian/html-proofer#configuration
htmlproofer ./_site --allow-hash-href --assume-extension --check-html --http-status-ignore "999,400,0" --empty_alt_ignore --url-ignore "/codepen.io/"


# Run Sass Lint verbose - cnfigured by .sass-lint.yml
sass-lint -v

# Run ESLint on the js/ directory
npx eslint js/

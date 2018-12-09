# Continuous Integration - run by Travis or can be run locally

# Run Jekyll build to generate site output
jekyll build

# Run HTML Proofer with the following parameters:
#
# --allow-hash-href				- Fix href="#" being marked as invalid
# --assume-extension			- Fix needing the .html extension on links
# --check_html					- Check for HTML errors using Nokogiri
# --enforce_https				- Enforce HTTPS (since hosted on HTTPS)
# --http-status-ignore "999"	- Ignore broken links with no error (caused by LinkedIn)
#
# Learn more: https://github.com/gjtorikian/html-proofer#configuration
htmlproofer ./_site --allow-hash-href --assume-extension --check-html --http-status-ignore "999"
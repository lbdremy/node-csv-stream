test:
	npm test

coverage:
	jscoverage lib lib-cov
	CSV_STREAM_COV=1 node_modules/mocha/bin/mocha -R html-cov > coverage.html
	rm -rf lib-cov

.PHONY: test
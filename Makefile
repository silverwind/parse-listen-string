node_modules: package-lock.json
	npm install --no-save
	@touch node_modules

.PHONY: deps
deps: node_modules

.PHONY: lint
lint: node_modules
	npx eslint --color .

.PHONY: test
test: node_modules lint
	npx vitest

.PHONY: publish
publish: node_modules
	git push -u --tags origin master
	npm publish

.PHONY: update
update: node_modules
	npx updates -cu
	rm -rf node_modules package-lock.json
	npm install
	@touch node_modules

.PHONY: patch
patch: node_modules test
	npx versions patch
	@$(MAKE) --no-print-directory publish package.json package-lock.json

.PHONY: minor
minor: node_modules test
	npx versions  minor
	@$(MAKE) --no-print-directory publish package.json package-lock.json

.PHONY: major
major: node_modules test
	npx versions  major
	@$(MAKE) --no-print-directory publish package.json package-lock.json

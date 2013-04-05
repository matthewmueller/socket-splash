
build: components index.js socket-splash.css template.js
	@component build --dev

template.js: templates/device.html templates/splash.html
	@component convert templates/device.html
	@component convert templates/splash.html

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

.PHONY: clean

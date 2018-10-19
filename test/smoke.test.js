import other from '../src/webpack/other';
import css from '../src/webpack/loaders/css';
import otherLoaders from '../src/webpack/loaders/other';

describe('other.js', () => {
	it('exports an object that looks like webpack config', () => {
		const config = other('test');

		expect(config).to.have.property('mode');
		expect(config).to.have.property('mode');
		expect(config).to.have.property('output');
		expect(config).to.have.property('module');
		expect(config).to.have.property('resolve');
		expect(config).to.have.property('optimization');
		expect(config).to.have.property('plugins');
	});
});

describe('loaders/css.js', () => {
	it('exports a map of objects that look like webpack loader rules', () => {
		Object.keys(css).forEach(key => {
			if (!(css[key] instanceof Array)) {
				expect(css[key]).to.have.property('loader');
				expect(css[key]).to.have.property('options');
			}
		});
	});
});

describe('loaders/other.js', () => {
	it('exports a map of objects that look like webpack loader rules', () => {
		Object.keys(otherLoaders).forEach(key => {
			expect(otherLoaders[key]).to.have.property('test');
			expect(otherLoaders[key]).to.have.property('loader');
		});
	});
});

# Shared Config

Contains shared config files for Split Demo repo builds.

## Usage

Make sure you have Node installed, then clone this repo and run:

```
npm install
```

or

```
yarn install
```

then, for example, in webpack config

```
import { webpack } from '@split-demo/shared-config';

export default function(options) {
	const config = webpack(appName);

	//do something with config, override values, add new ones

	return config;
}
```

## Building

You don't. It's build-time code.

## Other

This should be safe to npm/yarn link.
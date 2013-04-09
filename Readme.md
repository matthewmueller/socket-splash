
# socket-splash

  splash screen for device connections

![color tilt](http://f.cl.ly/items/3Z0U370Z1M331v1A0k1G/Screen%20Shot%202013-04-08%20at%209.15.09%20PM.png)

## Installation

    $ component install matthewmueller/socket-splash

## Example

```js
var iphone = device('iphone', 'mobile'),
    computer = device('computer', 'desktop');

splash('color-tilt')
  .desc('description about color-tilt')
  .add(iphone)
  .add(computer)
  .ready(fn);
```

## API

### `splash(title)`

Initialize `splash` with a given `title`.

### `.desc(description)`

Give a description to the experiment

### `.add(device)`

Add a required `Device` to the splash screen. The Device project is located at [matthewmueller/device](http://github.com/matthewmueller/device).

### `.ready(fn)`

`fn` is called when all the devices are present.

## License

  MIT

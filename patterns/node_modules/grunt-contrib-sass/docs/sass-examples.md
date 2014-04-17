# Examples

## Example config

```javascript
grunt.initConfig({
  sass: {                              // Task
    dist: {                            // Target
      files: {                         // Dictionary of files
        'main.css': 'main.scss',       // 'destination': 'source'
        'widgets.css': 'widgets.scss'
      }
    },
    dev: {                             // Another target
      options: {                       // Target options
        style: 'expanded'
      },
      files: {
        'main.css': 'main.scss',
        'widgets.css': [
          'button.scss',
          'tab.scss',
          'debug.scss'  // Maybe you need one extra file in dev
        ]
      }
    }
  }
});

grunt.loadNpmTasks('grunt-contrib-sass');

grunt.registerTask('default', ['jshint', 'sass']);
```

## Compile

```javascript
grunt.initConfig({
  sass: {
    dist: {
      files: {
        'main.css': 'main.scss'
      }
    }
  }
});
```

## Concat and compile

If you specify an array of `src` paths they will be concatenated. However, in most cases you would want to just `@import` them into `main.scss`.

```javascript
grunt.initConfig({
  sass: {
    dist: {
      files: {
      'main.css': [
          'reset.scss',
          'main.scss'
        ]
      }
    }
  }
});
```

## Compile multiple files

You can specify multiple `destination: source` items in `files`.

```javascript
grunt.initConfig({
  sass: {
    dist: {
      files: {
        'main.css': 'main.scss',
        'widgets.css': 'widgets.scss'
      }
    }
  }
});
```

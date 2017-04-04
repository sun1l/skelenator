# Skelenator
Utility to generate folder/file structure from a JSON or YAML file.

[![npm](https://img.shields.io/npm/v/skelenator.svg)](https://www.npmjs.com/package/skelenator)
[![GitHub issues](https://img.shields.io/github/issues/sun1l/skelenator.svg)](https://github.com/sun1l/skelenator/issues)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/sun1l/skelenator/master/LICENSE)

[Installation](#Installation) |
[Usage](#usage) |
[Contributing](#contributing) |
[License](#license)

## Installation

### Global Installation

Global installation is recommended, it allow you to generate and update skeleton from any location without specifying an absolute path.

```bash
npm install skelenator --g
```

## Usage

Once the `skelenator` is installed globally, you can generate the folder/file structure by passing a JSON or YAML file as argument. For e.g.

```bash
skelenator component.json
```

you can pass multiple files for more complex skeleton

```bash
skelenator component.json component.yml
```
component.yml
```
---
- app/:
  - components/:
    - Header/:
      - styles/:
        - styles.css
      - data/:
        - data.json
      - test/:
        - spec.js
      - assets/
      - index.js
      - README.md
```

component.json
```json
[
  {
    "app/": [
      {
        "components/": [
          {
            "Header/": [
              {
                "styles/": [
                  "styles.css"
                ]
              },
              {
                "data/": [
                  "data.json"
                ]
              },
              {
                "test/": [
                  "spec.js"
                ]
              },
              "assets/",
              "index.js",
              "README.md"
            ]
          }
        ]
      }
    ]
  }
]
```
will generate following skeleton

```bash
.../app/
.../app/components/
.../app/components/Header/
.../app/components/Header/styles/
.../app/components/Header/styles/styles.css
.../app/components/Header/data/
.../app/components/Header/data/data.json
.../app/components/Header/test/
.../app/components/Header/test/spec.js
.../app/components/Header/assets/
.../app/components/Header/index.js
.../app/components/Header/README.md
```

### Dryrun

It is always recommended to do a dryrun before generating the skeleton, to run `skelenator` in dryrun mode you need to pass `--dryrun`. This will not create any file or folder.

```bash
skelenator component.json --dryrun
```

### Overwriting

If any of the file already exist, `skelenator` will not overwrite it. To force overwrite, you need to pass `--overwrite`. For e.g.

```bash
skelenator component.json --overwrite
```

## Contributing

If you also like the idea of creating standard dotfiles, which can be shared with others, and you think you can contribute by improving the currently available dotfiles or adding new ones, please send a pull request.

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

*   **Sunil Kumar** - [@sun1lkumar](https://twitter.com/sun1lkumar)

See also the list of [contributors](https://github.com/sun1l/skelenator/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

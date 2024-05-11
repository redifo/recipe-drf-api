# Frontend Testing

***Links to other readme and testing files.***
[Frontend README.md](https://github.com/redifo/recipe-drf-api/blob/main/README.md).

[Backend README.md](https://github.com/redifo/recipe-drf-api/blob/main/README-BACKEND.md).

[BACKEND-TESTING](https://github.com/redifo/recipe-drf-api/blob/main/BACKEND-TESTING.md).

## Table of Contents

- [Frontend Testing](#frontend-testing)
  * [Table of Contents](#table-of-contents)
  * [Manual testing](#manual-testing)
  * [Automated tests](#automated-tests)
  * [Validator testing](#validator-testing)
    + [W3C CSS validator](#w3c-css-validator)
    + [ESLint JavaScript validator](#eslint-javascript-validator)
  * [Web Accessability Testing](#web-accessability-testing)
    + [WAVE web accessability testing](#wave-web-accessability-testing)
    + [Lighthouse testing](#lighthouse-testing)
  * [Resolved bugs](#resolved-bugs)
  * [Unresolved bugs](#unresolved-bugs)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>

## Manual testing

## Automated tests

## Validator testing
### W3C HTML Validation
[W3C Markup Validation](https://validator.w3.org/) is a service provided by the W3C that validates HTML code against official specifications, ensuring syntax correctness and adherence to web standards.

| **Tested** | **Result** | **View Result** | **Pass** |
--- | --- | --- | :---:
|All website pages| No errors | <details><summary>Screenshot of result</summary>![Result](/readme-documentation/tests/html-validator.png)</details>| :check_mark:

### W3C CSS validator

[W3C Jigsaw](https://jigsaw.w3.org/css-validator/) is a tool by the W3C for validating CSS code, ensuring compliance with web standards and promoting interoperability and accessibility.

The validator have shown that there were some issues in some of the css files (only 3 files and all the errors were due to the way i have used @media) and all errors have been fixed in the end. An example of the error can be seen below. 

<p align="center">
    <img src="readme-documentation/tests/recipe-css.png" width=400>
</p>

| **Tested** | **Result** | **View Result** | **Pass** |
--- | --- | --- | :---:
| all style files | no errors | <details><summary>Screenshot of result</summary>![Result](/readme-documentation/tests/css-success.png)</details>| :check_mark:

### ESLint JavaScript validator

All JavaScript files were validated using the ESLint JavaScript validator duting development and all warning and errors ahve been solved as sson as they appear or as soon as possoible. Identified issues were addressed accordingly.

## Web Accessability Testing
### WAVE web accessability testing
### Lighthouse testing

## Resolved bugs

## Unresolved bugs
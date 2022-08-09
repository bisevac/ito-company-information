# ITO Company Information

You can get the company all information with SICNUMBER.
Use proxy for high or repeatedly usage, but proxy is not required.

- Company Detail
- News Paper Information
- Branch Address
- Officials
- Old Company Officials
- Partners
- Old Partners
- Board of Directors
- Old Board Of Directors
- Documents Type

---
## Installation
```shell
$ npm install
```
---
## Usage

**Help**
```shell
$ node src/index.js -h
```

**Start**
```shell
$ node src/index.js -file {FILE_PATH} -out {OUT_PATH} -proxy {PROXY_LIST}
```

**Test**
```shell
$ npm run test
```
---

## Example File
- Input File - SICNUMBER Array
```json
[
    "123456-5",
    "654321-0"
]
```

- Proxy File - Proxy Array
```json
[
    "http://username:password@ip:port"
]
```

---
### Requirements
- Node >= 12


### Scripts
- test

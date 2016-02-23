<a name="0.2.5"></a>

# 0.2.5 (2015-02-23)
- build v0.2.5
- bug: revert UMD support due to breaking changes  (#288, #289, #290)
- bug: fix extend (PR #286)
- chore: fix typos in CHANGELOG

<a name="0.2.4"></a>

# 0.2.4 (2015-02-18)
- build v0.2.4
- Fixed jshint isuses
- added UMD support #273
- fixed broken tests
- updated bower and npm dependencies
- added .editorconfig file
- updated LICENSE #268

<a name="0.2.3"></a>

# 0.2.3 (2015-10-11)
- build v0.2.3
- Fixed jshint issues
- Updated mixed-up dates in change log

<a name="0.2.2"></a>

# 0.2.2 (2015-05-29)
- build v0.2.2
- fix(localStorage): parsing safety #230

<a name="0.2.1"></a>

# 0.2.1 (2015-05-18)

## Breaking Changes
- build v0.2.1
- refac(common): remove deprecated code
- fix(localStorage): load/save objects #225
- Fix for bug introduced in 0.2.0 boolean values that not in objects are not converted properly

<a name="0.2.0"></a>

# 0.2.0 (2015-05-10)

## Breaking Changes
- build v0.2.0
- fromJson was replaced by JSON.parse with reviver fn
- Allow multiple keys for `.remove()`
- Fixed wrong angular dependence version.
- docs(README): Video Tutorial
- Update Documentation
- Set individual expiry for cookies
- docs(README.md): get started
- docs(README.md): gitter badge
- Added Gitter badge
- refa(src): remove duplicated stringification of value while storing
- style(src): indentation
- fixed issue noted in issue #193
- Changes to clearAll function - accept RegExp
- add --save argument to install with bower
- docs(README.md): cookie.clearAll hash/title
- docs(README.md): expand cookie.clearAll
- Update README.md
- fix(LICENSE): update copyright year
- fix(README.md): add \n just for aesthetic
- docs(demo): better example and clearAll
- Update README.md
- fix(README.md): add badges
- Improved documentation for setStorageCookieDomain.
- Fix a minor typo in a comment
- docs(REAMME.md): version

<a name="0.1.1"></a>
# 0.1.1 (2014-10-06)


## Breaking Changes
- update your `index.html` file to reference angular-local-storage at its new
  path inside the `dist` directory `/angular-local-storage/dist/angular-local-storage.js`

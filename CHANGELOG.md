# CHANGELOG

## New Changes

### **[Unreleased]**

#### Added
- None

#### Fixed
- Ranking Table: Wins row not getting squished anymore. Make table heading texts no-wrap.

#### Updated
- None


## Change History

### **[v0.2.0]**

#### Added
- tablehub.renderVolleyTables and tablehub.renderDemoTables to replace tablehub.renderTables and enable the demo table for use in browser contexts

#### Fixed
- Dates on upcoming games now display in correct formats depending on screen width
- Remove container query anchor from productive tables altogether to avoid bugs and conflicts with classic media queries

#### Updated
- Improved responsiveness for the results table
- Improved responsiveness for the rankings table (new breakpoint introduced to hide logos on very small phones)

---
### **[v0.1.1]**

#### Added
- Components based on the original [vbcunibern-clubdesk-v2](https://github.com/devtronaut/vbc-unibern-clubdesk-v2)
- VolleyTables component for React based framework contexts (media queries)
- DemoTables component for React based framework contexts (container queries; intended for demo purposes (see [tablehub.ch](https://tablehub.ch/)))
- tablehub.renderTables function for browser environments with React and ReactDOM installed

- Rollup configuration to build and bundle the project for the above mentioned targets
- Github workflow to bump version, create tag and release to publish the component to the NPMJS registry

#### Fixed
- None

#### Updated
- None

---
Day-0 ~31.10.2024

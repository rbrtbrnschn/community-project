# Component Conventions

## Components Are Stored In A Directory Within _client/src/components_
- components, that are whole pages will use **Pascal/upper camel** _casing_
- components used throught multiple pages will use **lower camel** _casing_
- components, which do not cater to the propertiers above shall start with an **'_' / underscore**
- component directories shall include each sub or child component and their according stylesheets.
- component directories shall include a **package.json** file, which uses the _"main"_ property to point to the "main" component

## Example Of A **package.json**
for a component that is a **page**

_src/components/Component_
```json
{
	"main":"Component.js"
}
```
for a component that can be used in **multiple pages and/or scenarios**

_src/components/component_
```json
{
	"main":"component.js"
}
```
## Why?
_linked in [README.md](README.md)_
For Making Life Just A Bit Easier:
**old way** _of importing_

Page Component
```js
import Component from "../components/thisParticularComponent/ThisParticularComponent.jsx"
```
Actual Component
```js
import "../../css/thisParticularComponent/stylesheet.css"
```

**with the casing conventions**

Page Component
```js
import Component from "./component"
```

Actual Component
```js
import "./component.scss"
```

## Setting Up Routing For Pages
It is **dead simple**.

App.js
```js
import Component from "./components/Component"

return(
	<Component />
);

```

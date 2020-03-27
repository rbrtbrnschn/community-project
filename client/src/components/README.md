# [Component Naming Conventions](CONVENTIONS.md)

## Why?
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
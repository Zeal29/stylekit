# stylekit

This package contain many helpfull function and tools for styling you ui

# installation

```bash
npm i @ali_nawaz/style-kit
```

# Setup

in you main.ts or main.js file or what ever the most starting point of you app, Import the setup function and run it, If it is react app then.

```javascript
import React from "react";
import ReactDOM from "react-dom";
import { setup } from "@ali_nawaz/style-kit";

import "./index.css";
import App from "./App";

setup();

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root"),
);
```

# Usage

it is ment to be use with styled components like that

```javascript
import { intpW } from "@alinawaz/stylekit";

import styled from "styled-components";

const Box = styled.div`
	background-color: hsl(${intpW("", [320, 0], [1920, 360])}, 90%, 50%);

	height: ${intpW("px", [320, 50], [1920, 100])};
	width: ${intpW("px", [320, 50], [1920, 100])};
`;

```

the full code of can be look like

```javascript
import React, { useState } from "react";
import "./App.css";

import { intpW } from "@alinawaz/stylekit";

import styled from "styled-components";

const Box = styled.div`
	background-color: hsl(${intpW("", [320, 0], [1920, 360])}, 90%, 50%);

	height: ${intpW("px", [320, 50], [1920, 100])};
	width: ${intpW("px", [320, 50], [1920, 100])};
`;

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="App">
			<header className="App-header">
				<h2>{intpW("px", [320, 40], [1920, 65])}</h2>
				<Box></Box>
			</header>
		</div>
	);
}

export default App;

```

this is just a dummy example i will update the readme late

what is intpW function is?

```javascript
intpW("px", [320, 50], [1920, 100])
```

The first parameter is the unit and the second parameter is an array of tuples [number,number] and you can add as many break points as you whish.

what does it do?

the function will spit out a css equation which will be evaluated to 50px if the current screen size is smaller or equal to 320px or 100px if it is equals to 1920px or greater. Other wise if screen width is in the middle of 320px - 1920px the it will evaluate according to the interpolated value by the formula

y <= output value
x <= current screen width
x1 <= 320px
x2 <= 1920px
y1 <= 50px
y2 <= 100px

`y = y1 + ((x – x1) / (x2 – x1)) * (y2 – y1)`

# stylekit
This package contain many helpfull function and tools for styling you ui

# installation

`npm i @ali_nawaz/style-kit
`

# Setup
in the main.ts or main.js or what ever you most starting point of you app is import the setup function and run it like this if it is react app

```import React from "react";
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

```
import { intpW } from "@alinawaz/stylekit";

import styled from "styled-components";

const Box = styled.div`
	background-color: hsl(${intpW("", [320, 0], [1920, 360])}, 90%, 50%);

	height: ${intpW("px", [320, 50], [1920, 100])};
	width: ${intpW("px", [320, 50], [1920, 100])};
`;

```

the full code of can be look like

```
import React, { useState } from "react";
import "./App.css";

import { intpW } from "@alinawaz/stylekit";

import styled from "styled-components";

const Box = styled.div`
	background-color: hsl(${intpW("", [320, 0], [1920, 360])}, 90%, 50%);

	height: 50px;
	width: 50px;
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

# <img src='https://camo.githubusercontent.com/190254ed78fd2f87c30ee53e398af3fd87e4f4eb/68747470733a2f2f692e696d6775722e636f6d2f374e47785a744a2e706e67' width='800' alt='React Flow Diagram' />

Batteries included React Component for rendering, creating and editing diagrams.

<img src='https://i.imgur.com/WSZQXa3.gif' width='800' alt='React Flow Diagram demo' />

## Features

- The data is the source of truth
- Can add custom Entities as React Components
- Adding custom icons for these entities appear in Panel and Context Menu
- Infinite canvas to work with; panning
- Zooming for detail work or bird's eye view
- Configurable grid, snap to grid (or no grid at all)
- Continuous feedback while editing
- History, undo, redo; keyboard shortcuts
- Panel for adding new Entities, with drag or click
- Automatic arrow placement
- Labels for arrows

### Missing features (currently working on)

- Editable arrow labels (From the UI; the model and render already contemplates this feature)
- Editable arrow paths (From the UI; the model and render already contemplates this feature)
- Select several entities
- Copy and paste entities
- Alignment tools


## Installation

It's easier to see the an example already working to explain what we need to add. Pull [react-flow-diagram-example](https://github.com/DrummerHead/react-flow-diagram-example) and follow along; consider it a finished state of following these instructions. You can also use this repo as a starting point for your own implementation.

Let's assume a fresh [create-react-app](https://github.com/facebook/create-react-app) (which the example is created from) structure, then:

```
yarn add react-flow-diagram
```

And we'll also add [styled-components](https://github.com/styled-components/styled-components) for our custom entities, although this is not a requirement. You can just add `classNames` to elements and use regular css or any css transpilation language.

```
yarn add styled-components
```

in `/src/` we create a `/CustomDiagram/` following a standard of [Grouping by features](https://reactjs.org/docs/faq-structure.html#grouping-by-features-or-routes)

And in it we create:

* [model-example.js](https://github.com/DrummerHead/react-flow-diagram-example/blob/master/src/CustomDiagram/model-example.js)
* [config-example.js](https://github.com/DrummerHead/react-flow-diagram-example/blob/master/src/CustomDiagram/config-example.js)
* [index.js](https://github.com/DrummerHead/react-flow-diagram-example/blob/master/src/CustomDiagram/index.js)
* event
  * [component.js](https://github.com/DrummerHead/react-flow-diagram-example/blob/master/src/CustomDiagram/event/component.js)
  * [icon.js](https://github.com/DrummerHead/react-flow-diagram-example/blob/master/src/CustomDiagram/event/icon.js)
* task
  * [component.js](https://github.com/DrummerHead/react-flow-diagram-example/blob/master/src/CustomDiagram/task/component.js)
  * [icon.js](https://github.com/DrummerHead/react-flow-diagram-example/blob/master/src/CustomDiagram/task/icon.js)


### [model-example.js](https://github.com/DrummerHead/react-flow-diagram-example/blob/master/src/CustomDiagram/model-example.js)

The star of the show, the model that holds the data that will be represented as a diagram.

You don't need to consciously know the structure of the model, since you can always start a diagram via the UI, save it and resume from the UI without ever touching the model. But you may need this information for your specific use case.

The structure held in the `model` const can be defined in [flow types](https://flow.org/en/docs/types/) as (you don't really need to know flowtype to grasp this):

```JavaScript
type EntityState = Array<EntityModel>;
```

model is an array with `EntityModel`s representing each entity

```JavaScript
type EntityType = string;
type EntityModel = {
  id: EntityId,      // unique identifier of the Entity
  type: EntityType,  // type of entity, according to your custom entity components
  width: number,     // width
  height: number,    // height
  x: number,         // x position
  y: number,         // y position
  name: string,      // label of the entity
  linksTo?: Links,   // reference to other entities
  custom?: Object,   // custom data for you to extend functionalities
};
```

The `id` of an `EntityModel` is an `EntityId`; which is just a string

```JavaScript
type EntityId = string;
```

The `linksTo` attribute is [optional](https://flow.org/en/docs/types/objects/#toc-optional-object-type-properties) (an entity may not link to anyone) and holds a `Links` type, which is an array of `Link`

```JavaScript
type Links = Array<Link>;

type Link = {
  target: EntityId,      // Id of another entity which is being linked to
  edited: boolean,       // whether or not the link was autogenerated or was edited by the user
  points?: Array<Point>, // Array of points that define the position of the link
  label?: string,        // link label
  color?: string,        // link color (currently not implemented)
};
```

The `points` attribute is also optional (as well as any attribute ending with `?`) and holds an array of `Point`

```JavaScript
type Point = {
  x: number,  // x position
  y: number,  // y position
};
```

Check [model-example.js](https://github.com/DrummerHead/react-flow-diagram-example/blob/master/src/CustomDiagram/model-example.js) to see who this all pans out.


### [config-example.js](https://github.com/DrummerHead/react-flow-diagram-example/blob/master/src/CustomDiagram/config-example.js)

In this file we have two configuration objects, `config` which deals with diagram configurations and `customEntities` which holds references to our custom components that represent each type of entity.

`config` can be defined as:

```JavaScript
type ConfigState = {
  entityTypes: ConfigEntityTypes, // Size of entities
  gridSize?: number,              // optional grid size
};
```
`ConfigEntityTypes` is an [object being used as a Map](https://flow.org/en/docs/types/objects/#toc-objects-as-maps) whose keys reference the types of entities.

```JavaScript
type ConfigEntityTypes = {
  [EntityType]: {
    width: number,
    height: number,
  },
};
```

It's recommended to find an entity size that is a multiple of the grid size; however you're free to choose any positive `number`.

`customEntities` can be defined as:

```JavaScript
type CustomEntities = {
  [EntityType]: {
    component: ComponentType<DiagComponentProps>,
    icon: {
      path: Element<*>,
      size: number,
    },
  },
};
```

The `component` attribute holds a reference to a [React Component](https://reactjs.org/docs/react-component.html) that will be provided `DiagComponentProps` props. The creation of your custom components is covered in [Creating our own Entities](#creating-our-own-entities)

```JavaScript
type DiagComponentProps = {
  model: EntityModel,
  meta: MetaEntityModel,
  setName: SetNamePayload => EntityAction,
};
```

You can use this props to get information about the component, and `setName` method to change the name of the component.

We referenced `EntityModel` before, and `MetaEntityModel` can be defined as:

```JavaScript
type MetaEntityModel = {
  id: EntityId,
  isAnchored: boolean,
  isSelected: boolean,
};
```

Which is information that only matters while interacting with the components on the UI. You wouldn't need to save this information. A [HOC](https://reactjs.org/docs/higher-order-components.html) [Entity component](https://github.com/DrummerHead/react-flow-diagram/blob/master/src/entity/component.js) will deal about positioning, selection, context menus and more for you, so you just need to focus on the specific features of your custom Entity.


### [index.js](https://github.com/DrummerHead/react-flow-diagram-example/blob/master/src/CustomDiagram/index.js)

On index we define our custom Component that initializes seting throguh `componentWillMount` and passes `customEntities` to the `Diagram` Component

```JavaScript
import React from 'react';
import {
  Diagram,
  store as diagramStore,
  setEntities,
  setConfig,
  diagramOn,
} from 'react-flow-diagram';
import model from './model-example';
import { config, customEntities } from './config-example';

class CustomDiagram extends React.PureComponent {
  componentWillMount() {
    diagramStore.dispatch(setConfig(config));
    diagramStore.dispatch(setEntities(model));

    diagramOn('anyChange', entityState =>
      // You can get the model back
      // after modifying the UI representation
      console.info(entityState)
    );
  }
  render() {
    return <Diagram customEntities={customEntities} />;
  }
}

export default CustomDiagram;
```

We dispatch a `setConfig` and `setEntities` action to the `diagramStore`, and on `anyChange` we can get a hold of our modified `entityState`

### event and task folders

We'll cover this in the next section:

## Creating our own Entities

This component does not come with any custom entities, and you must create your own. However on [react-flow-diagram-example](https://github.com/DrummerHead/react-flow-diagram-example/) we have two examples of custom entities, namely [task](https://github.com/DrummerHead/react-flow-diagram-example/tree/master/src/CustomDiagram/task) and [event](https://github.com/DrummerHead/react-flow-diagram-example/tree/master/src/CustomDiagram/event).

Let's take a look at the task entitiy as an example.

In the [task folder](https://github.com/DrummerHead/react-flow-diagram-example/tree/master/src/CustomDiagram/task) we see two files:

* [component.js](https://github.com/DrummerHead/react-flow-diagram-example/blob/master/src/CustomDiagram/task/component.js)
* [icon.js](https://github.com/DrummerHead/react-flow-diagram-example/blob/master/src/CustomDiagram/task/icon.js)

Let's start with...

### [component.js](https://github.com/DrummerHead/react-flow-diagram-example/blob/master/src/CustomDiagram/task/component.js)

Our custom component will be visually rendered on the UI in such a way that it uniquely identifies a specific concept. We can take for example [BPMN's](https://en.wikipedia.org/wiki/Business_Process_Model_and_Notation#Elements) elements or [UX flow diagrams](http://jjg.net/ia/visvocab/#page). Perhaps in the future we'll include Packs with custom entities for these types of use cases, but for now you'll have to create your own.

Our entity can also deal with user interaction such as changing the name and whatever interaction you may come up with, with the possibility of using already present information in the `EntityModel` or adding your custom data to `custom` object field.

There are no specific requirements for the component. What we do need to know is that the component will be provided `DiagComponentProps` props, which encompasses:

```JavaScript
type DiagComponentProps = {
  model: EntityModel,
  meta: MetaEntityModel,
  setName: SetNamePayload => EntityAction,
};
```

More details about `EntityModel` in the [model-example.js](#model-examplejs) section and `MetaEntityModel` in the [config-example.js](#config-examplejs) section.

`setName` is a connected action that takes the propery `SetNamePayload` and returns `EntityAction`. The return of the function can be ignored since the important aspect is the side effect that sets the name of the entity.

```JavaScript
type SetNamePayload = { id: EntityId, name: string };
```

A usage example in [component.js](https://github.com/DrummerHead/react-flow-diagram-example/blob/master/src/CustomDiagram/task/component.js) is:

```JavaScript
handleKeyPress = (ev) => {
  switch (ev.key) {
    case 'Enter':
      this.toggleEdit(false);
      this.props.setName({ id: this.props.model.id, name: this.state.name });
      break;
    case 'Escape':
      this.toggleEdit(false);
      this.setState({ name: this.props.model.name });
      break;
    // no default
  }
};
```

### [icon.js](https://github.com/DrummerHead/react-flow-diagram-example/blob/master/src/CustomDiagram/task/icon.js)

We also need to provide an icon which will be used in the Panel for adding new elements and in the contextual menu for each entity to quickly add new entities.

```JavaScript
import React from 'react';

const icon = {
  path: (
    <path d="M14 0H2C1 0 0 1 0 2v12c0 1 1 2 2 2h12c1 0 2-1 2-2V2c0-1-1-2-2-2z" />
  ),
  size: 16,
};

export default icon;
```

The icon consists of a `path` SVG React Element and a size that is the same as the size of `viewBox` SVG attribute. [Check the icon component](https://github.com/DrummerHead/react-flow-diagram/blob/master/src/icon/component.js#L59-L69) to make this more clear.

The size attribute is provided so you don't need to transform the SVG element to fix exactly the needs of the panel or context menu. If we didn't have the size attribute, the SVG element may overflow or underflow its container.


## Examples

You can use [react-flow-diagram-example](https://github.com/DrummerHead/react-flow-diagram-example) as a template of a working implementation and modify it for your own needs.

With time I'll add more examples, namely:

- Integration with Redux
- Using the provided flow types


## Some History

In a [Trailblazer](http://trailblazer.to/) related project I had the task of creating an editing environment surrounding [bpmn-js](https://github.com/bpmn-io/bpmn-js) which was the first diagramming library we used. bpmn-js proved to be a feature rich library, but extending to add the features we wanted proved to be practically impossible, coupled with dwindling documentation. It's still a great option if you're not thinking of adding your own types of entities or swerving from the BPMN model at all.

After assessing many diagramming libraries available, my second go after bpmn-js was [react-diagrams](https://github.com/projectstorm/react-diagrams); which worked pretty well, had modern JS standards and was more extensible. However the source of truth (model) was scattered through many object's internal state and getting to the underlying data proved difficult in many scenarios.

I was quite happy with the idea of using a time-tested open source library, but the options available left me making the decision to build an alternative. I hope it's useful for you!

## Contributing

TODO

## Companies using React Flow Diagram

<a href='http://trailblazer.to/'><img src='https://camo.githubusercontent.com/7a4c0bd3982e63dfdc47be5f66f58d9dd23d84bf/68747470733a2f2f692e696d6775722e636f6d2f3348556e5a74482e706e67' width='200' alt='TRAILBLAZER' /></a>

## Sponsored by

<a href='http://trailblazer.to/'><img src='https://camo.githubusercontent.com/7a4c0bd3982e63dfdc47be5f66f58d9dd23d84bf/68747470733a2f2f692e696d6775722e636f6d2f3348556e5a74482e706e67' width='200' alt='TRAILBLAZER' /></a>


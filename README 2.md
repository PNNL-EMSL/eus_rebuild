This project is a custom configuration of
```
create-react-app myapp --scripts-version=react-scripts-ts-antd
```
to support the **emotion** module for css-in-js styles.  This included
adding the **react-app-rewired** module so we can hook into the webpack
config in order to add a babel preprocessor to support emotion style
syntax in the tsx.

The typescript config (tsconfig.json) was modified (i.e., baseUrl was modified) to allow absolute paths in imports in tsx files.

## Key Module Libraries

- [Typescript](#typescript)
- [Ant Design](#antdesign)
- [Emotion](#emotion)
- [Sass/Less](#sass)
- [Font Awesome](#fontawesome)
- [Ant Design Icons](#antdesignicons)
- [Apollo Client](#apolloclient)

## Typescript <a name="typescript"></a>
Typescript is used to strongly type your classes, functions, and variables, which makes your IDE way more
effective at autocompleting code, enbabling developers to code much more quickly.  It also finds errors/typos
as soon as they are written, preventing bugs and reducing the debug cycle.

For third party libs with type definitions, you can import the type definitions as follows:
https://basarat.gitbooks.io/typescript/docs/types/@types.html

Any violations in the tslint rules will cause the compiler to fail.  Some of these rules may be overly restrictive, 
so we may need to loosen the tslint rules when we find ones that are particularly annoying.  If you change a tslint 
setting (tslint.json) or in the compiler options (tsconfig.json), you must restart your node server before they will
take effect.

## Ant Design <a name="antdesign"></a>
Ant Design is an open source library created by Alibaba (China's Amazon - it's huge).  It's an excellent library with
the most complete set of widgets out there (including calendars, really nice data tables, and select lists with built-in
typeahead support).  There's quite a bit of documentation online, but it's been interpreted from Chinese, so some of it
is confusing, but the code examples are good.

Ant Design uses less, not emotion for styles.  There are instructions on how to override the Ant Design less variables
(to globally change colors), but I haven't done that yet.  Instead I can easily override styles via emotion component
styles, and that is working fine for me so far.  I will update the documentation if I figure out how to override the 
less variables, but since it involves the webpack configuration, this is more tricky.

https://ant.design/docs/react/introduce

## Emotion <a name="emotion"></a>
Emotion is the leading library for css-in-js, which is the next generation of styles which includes best practices
built into the library.  It makes for much more maintainable styles, it is more performant, and it prevents any 
name collisions.  Asside from some special syntax (i.e., css, styled), you write normal css just like you are used to. 
So far, I'm super impressed.

https://github.com/emotion-js/emotion

## Sass or Less <a name="sass"></a>
If you really want to write traditional styles the old fashioned way, this build also includes css modules with
sass (*.scss) and less (*.less) loaders configured in the webpack workflow.   You can create a style file under the 
src/styles/ folder and then import it into your component ( e.g., import 'styles/index.less';).

## Font Awesome Icons
To use font awesome icons in your component, all you have to do is import the font awesome stylesheet:  
```import 'font-awesome/css/font-awesome.css';```

## Ant Design Icons
Ant Design comes with a set of icons that can compliment those from font awesome.  To use an Ant Design icons, you 
create an <Icon> component, as explained here: https://ant.design/components/icon/.

## Apollo Client <a name="apolloclient"></a>
Apollo Client provides all the react middleware and components to easily hook in remote web services following 
the graphql protocol.

https://www.apollographql.com/docs/react/

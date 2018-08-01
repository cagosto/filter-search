# Filter Search

Filter down a list by searching using an ES6 class that can be extended to fit your needs.  Basic example [here](https://codepen.io/Cagosto/pen/LegEao).

## How to use
First import the class to be used.

```
import FILTER from 'filter-search';
```

Then pass it the required arguments for set up.  As listed below.

| Options        | Type        | Require    | Default Value    |
| -------------  |-----------  | ---------  |----------------  |
| holder         | String      | true       | ''               |
| filter         | String      | true       | ''               |
| searchInput    | String      | true       | ''               |
| displayFilter  | String      | false      | null             |
| filterList     | Array       | true       | []               |
| activeKeyClass | String      | false      | ''               |
| keybordAcitve  | Boolean     | false      | false            |

```
new FILTER({
  holder: '.filter-scroll',
  filter: '.filter-box',
  searchInput: '#filter-search',
  filterList : [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Anguilla"
  ],
});
```

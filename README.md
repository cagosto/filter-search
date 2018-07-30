# Filter Search

Filter down a list by searching using an ES6 class that can be extended to fit your needs.  Basic example [here](https://codepen.io/Cagosto/pen/LegEao).

## How to use
First import the class to be used.

```
import FILTER from 'filter-search';
```

Then pass it the required arguments for set up.  As listed below.

```
new FILTER({
  holder: '.filter-scroll',
  filter: '.filter-box',
  searchInput: '#filter-search',
  displayFilter: optional | 'filter-box--active' (default),
  displayFilterItem: optional | 'filter-box__item--inactive' (default),
  filterList : [List of filters]
});
```

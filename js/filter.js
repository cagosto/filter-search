export default class FILTER {
  constructor(settings) {
    const {
      displayFilter,
      displayFilterItem,
      filter,
      holder,
      searchInput,
      filterList
    } = settings

    this.displayFilter = displayFilter || 'filter-box--active'
    this.displayFilterItem = displayFilterItem || 'filter-box__item--inactive'
    this.filter = document.querySelector(filter)
    this.filterHolder = this.filter.querySelector(holder)
    this.filterItems = filterList
    this.searchBox = document.querySelector(searchInput)
    this.events()

    this.filterHolder.innerHTML = this.templet(this.filterItems)
  }
  keyList = [
    38,
    40,
    37,
    39,
    13,
    91
  ]
  /**
   * templet - Markup for each filter item
   * @param  {Arry} list - List of item to be displayed
   * @return {String} - Markup for list
   */
  templet = list => list.map(item => `<button data-val=${item}>${item}</button>`).join('')
  events() {
    this.searchBox.addEventListener('click', this.openEvt, false)
    this.searchBox.addEventListener('keyup', this.filterEvt, false)
    document.body.addEventListener('click', this.closeEvt, false)
    this.filterHolder.addEventListener('click', this.changeCopy, false)
  }
  /**
   * changeCopy - Update input after item is selected
   * @param  {Obj} e - event object
   */
  changeCopy = (e) => {
    if (e.target.matches('button')) {
      this.searchBox.value = e.target.innerHTML
    }
  }
  /**
   * openEvt - Show filter list dropdown
   * @param  {Obj} e - event object
   */
  openEvt = (e) => {
    e.stopPropagation()
    this.filter.classList.add(this.displayFilter)
  }
  /**
   * closeEvt - Hide filter list dropdown
   * @param  {Obj} e - event object
   */
  closeEvt = (e) => {
    this.filter.classList.remove(this.displayFilter)
  }
  /**
   * filterEvt - filter list form user typing
   * @param  {Obj} e - event object
   */
  filterEvt = (e) => {
    const key = e.which
    const val = e.currentTarget.value.toLowerCase()

    if(this.keyList.indexOf(key) < 0 ){
      this.filterHolder.innerHTML = this.templet(this.filterDisplay(val))
    }
  }
  /**
   * filterDisplay - filter down list
   * @param  {String} val - Value for filtering down list
   * @return {Array} - Array of filtered down values basiced off of passed in value  
   */
  filterDisplay = (val) => this.filterItems.filter(filter => filter.toLowerCase().substring(0, val.length) === val)
}

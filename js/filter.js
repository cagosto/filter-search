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
  templet = list => list.map(item => `<button data-val=${item}>${item}</button>`).join('')
  events() {
    this.searchBox.addEventListener('click', this.openEvt, false)
    this.searchBox.addEventListener('keyup', this.filterEvt, false)
    document.body.addEventListener('click', this.closeEvt, false)
    this.filterHolder.addEventListener('click', this.changeCopy, false)
  }
  changeCopy = (e) => {
    if (e.target.matches('button')) {
      this.searchBox.value = e.target.innerHTML
    }
  }
  openEvt = (e) => {
    e.stopPropagation()
    this.filter.classList.add(this.displayFilter)
  }
  closeEvt = (e) => {
    this.filter.classList.remove(this.displayFilter)
  }
  filterEvt = (e) => {
    const key = e.which
    const val = e.currentTarget.value.toLowerCase()

    if(this.keyList.indexOf(key) < 0 ){
      const filter = this.filterItems.filter(filter => filter.toLowerCase().substring(0, val.length) === val)

      this.filterHolder.innerHTML = this.templet(filter)
    }
  }
}

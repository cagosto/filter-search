export default class FILTER {
  constructor(settings = {}) {
    const defaults = {
      displayFilter: null,
      filterList: [],
      keyboardActive: false,
      holder: '',
      filter: '',
      searchInput: '',
      activeKeyClass: '',
      keyboardActive: false
    }
    const mergdSettings =  { ...defaults, ...settings }
    const {
      displayFilter,
      filter,
      holder,
      searchInput,
      filterList,
      activeKeyClass,
      keyboardActive
    } = mergdSettings

    this.displayFilter = displayFilter
    this.filter = document.querySelector(filter)
    this.filterHolder = this.filter.querySelector(holder)
    this.filterItems = filterList
    this.searchBox = document.querySelector(searchInput)
    this.totalItems = filterList.length
    this.activeKeyClass = activeKeyClass
    this.keyboardActive = keyboardActive
    this.events()

    this.filterHolder.innerHTML = this.templet(this.filterItems)
  }
  count = -1
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
    if(this.displayFilter !== null) {
      this.searchBox.addEventListener('click', this.openEvt, false)
      this.searchBox.addEventListener('keyup', this.filterEvt, false)
    }

    document.body.addEventListener('click', this.closeEvt, false)
    this.filterHolder.addEventListener('click', this.changeCopy, false)
  }
  /**
   * changeCopy - Update input after item is selected
   * @param {Obj} e - event object
   */
  changeCopy = (e) => {
    if (e.target.matches('button')) {
      this.searchBox.value = e.target.innerHTML
    }
  }
  /**
   * openEvt - Show filter list dropdown
   * @param {Obj} e - event object
   */
  openEvt = (e) => {
    e.stopPropagation()
    this.filter.classList.add(this.displayFilter)
  }
  /**
   * closeEvt - Hide filter list dropdown
   * @param {Obj} e - event object
   */
  closeEvt = (e) => {
    this.filter.classList.remove(this.displayFilter)

    this.count = -1
  }
  /**
   * filterEvt - filter list form user typing
   * @param {Obj} e - event object
   */
  filterEvt = (e) => {
    const key = e.which
    const val = e.currentTarget.value.toLowerCase()

    if(this.keyList.indexOf(key) < 0 ){
      this.count = -1
      this.filterHolder.innerHTML = this.templet(this.filterDisplay(val))
    }

    if(this.keyboardActive && (key === 40 || key === 38)){
      this.activeKeySettings(key)
    }
  }
  /**
   * activeKeySettings - Set active state when using keybord arrows
   * @param  {Num} dir - keborde which value
   */
  activeKeySettings(dir){
    const {
      totalItems,
      filterHolder,
      activeKeyClass} = this
    const item = filterHolder.children
    const isActive = filterHolder.querySelector(`.${activeKeyClass}`)

    if(dir === 40){
      this.count = (this.count !== (totalItems - 1)) ? ++this.count : 0
    } else {
      this.count = (this.count !== 0) ? --this.count : totalItems - 1
    }

    if(isActive){
      isActive.classList.remove(activeKeyClass)
    }

    item[this.count].classList.add(activeKeyClass)
  }
  /**
   * filterDisplay - filter down list
   * @param  {String} val - Value for filtering down list
   * @return {Array} - Array of filtered down values basiced off of passed in value
   */
  filterDisplay = (val) => {
    const list = this.filterItems.filter(filter => filter.toLowerCase().substring(0, val.length) === val)

    this.totalItems = list.length

    return list
  }
}

export default class FILTER {
  constructor(settings) {
    this.displayFilter = settings.displayFilter || 'filter-box--active';
    this.displayFilterItem = settings.displayFilterItem || 'filter-box__item--inactive';
    this.filter = document.querySelector(settings.filter);
    this.filterHolder = document.querySelector(settings.holder);
    this.filterItems =  this.filterHolder.children
    this.searchBox = document.querySelector(settings.searchInput);
    this.filterEvt = this.filterEvt.bind(this);
    this.openEvt = this.openEvt.bind(this);
    this.closeEvt = this.closeEvt.bind(this);
    this.changeCopy = this.changeCopy.bind(this);
    this.events();
  }
  events(){
    this.searchBox.addEventListener('click', this.openEvt, false)
    this.searchBox.addEventListener('keyup', this.filterEvt, false)
    document.body.addEventListener('click', this.closeEvt, false)
    this.filterHolder.addEventListener('click', this.changeCopy, false);
  }
  changeCopy(e){
    if(e.target.matches('button')){
      this.searchBox.value = e.target.innerHTML;
    };
  }
  openEvt(e){
    e.stopPropagation();
    this.filter.classList.add(this.displayFilter);
  }
  closeEvt(e){
    this.filter.classList.remove(this.displayFilter);
  }
  filterEvt(e){
    let val = e.currentTarget.value.toLowerCase();
    for (var i = 0; i < this.filterItems.length; i++) {
      let elem = this.filterItems[i];
      if(elem.innerHTML.toLowerCase().substring(0, val.length) === val){
        elem.classList.remove(this.displayFilterItem)
      }else{
        elem.classList.add(this.displayFilterItem)
      }
    }
  }
}

var updateSearchBarOnProductsDataTable = function () {
  var searchBar = document.getElementById('productTable_filter')
  if (!searchBar) return

  var section = searchBar.closest('.section')
  var menubar = section.querySelector('.menubar')
  menubar.className += ' uc-menubar'

  var scrollable = section.querySelector('.scrollable')
  scrollable.className += ' uc-scrollable'

  var label = searchBar.querySelector('label')
  var input = label.querySelector('input')
  input.placeholder = label.textContent

  var iElement = document.createElement('i')
  iElement.className = 'icon-search'

  searchBar.innerText = ''

  searchBar.appendChild(iElement)
  searchBar.appendChild(input)
}

$(document).ready(function () {
  setTimeout(function () {
    updateSearchBarOnProductsDataTable()
  }, 200)
})

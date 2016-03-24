import view from './view'

export default function main() {
  document.addEventListener('DOMContentLoaded', onDOMContentLoaded)
  view()
}

let mediumLinkButton

function onDOMContentLoaded(e) {
  mediumLinkButton = document.querySelector('#medium-link')

  // -()---()-()--()----()--()- key press events
  // -()----------()----()----- filter for enter key
  // -()----------()----------- map to medium link in input
  // ----()----------()-------- map to response from GET for article text
  //      \           \      
  //       \           --()---- transform to stream emitting streams of
  //        --()----            certain transformed text data
  //                            subscribe to these streams from the view

  document.addEventListener('keypress', onKeyPress)
}

function onKeyPress(e) {
  const code = e.keyCode || e.which
  if (code === 13) {
    console.log(mediumLinkButton.value)
  }
}

main()

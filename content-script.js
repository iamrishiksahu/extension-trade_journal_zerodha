console.log('tested')

const appNode = document.getElementById('app')

const observer = new MutationObserver((mutations, observer) => {

    for (var mutation of mutations) {

        // console.log(mutation)
        if (mutation.type == 'childList') {
            // console.log('A child node has been added or removed.');

            for (let addedNode of mutation.addedNodes) {

                // if (addedNode.type === Node.ELEMENT_NODE){
                if (addedNode.nodeType === Node.ELEMENT_NODE && addedNode.nodeName === 'FORM') {
                    const formClasses = addedNode.classList.value.split(' ')

                    if (formClasses.includes('order-window') && formClasses.includes('layer-2')) {
                        console.log('Found!', addedNode, addedNode.childNodes[4])

                        const qtyInput = document.querySelector(".order-window input[label='Qty.'")
                        const instrumentName = document.querySelector(".order-window span.tradingsymbol span.name").getInnerHTML()
                        const headerArea = document.querySelector('.order-window .eight.columns.instrument')
                        const newEl = document.createElement('div')
                        newEl.textContent = 'This is text'
                        newEl.style = 'color: black;'
                        
                        headerArea.appendChild(newEl)

                        // const el = addedNode.childNodes.indexOf('section')

                        qtyInput.addEventListener('change', (event) => {
                            // This function will be called when the input value changes
                            console.log('Input value changed:', event.target.value);
                        });
                        // console.log(qtyInput)
                    }
                }
                // }
            }
        }
        else if (mutation.type == 'attributes') {
            // console.log?('The ' + mutation.attributeName + ' attribute was modified.');
        }
    }


});
observer.observe(appNode, {
    subtree: true,
    attributes: true,
    childList: true
});
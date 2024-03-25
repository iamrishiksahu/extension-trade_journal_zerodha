console.log('tested')

const appNode = document.getElementById('app')

// const createOrderWindowWidget = () => {
//     const parentNode = document.
// }

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
                        const headerArea = document.querySelector('.order-window .exchange-selector')
                        const newEl = document.createElement('div')
                        newEl.innerHTML = '<div><div style="display: flex; gap: 8px; trnsition: all 200ms ease;"><input type="checkbox" id="tjr-ow-addtotjr-chckbx" checked=true></input><p>Add to Trade Journal</p></div> <input id="tjr-ow-commentbox" style="background-color: #edf3ff;border: none;border-radius: 2px;height: 48px;width: 100%;color: #444;" multiline rows="3" multiline placeholder="type comment..." ></input></div>'
                        newEl.style = 'position: relative; z-index: 100;'

                        headerArea.appendChild(newEl)
                        const commentBox = document.querySelector('#tjr-ow-commentbox')

                        document.querySelector('#tjr-ow-addtotjr-chckbx').addEventListener('change', (e) => {
                            if(e.target.checked){
                                commentBox.style.display = 'block'
                            }else{
                                commentBox.style.display = 'none'
                            }
                        })

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
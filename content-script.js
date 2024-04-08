const appNode = document.getElementById('app')

const pushTradeEntry = (payload) => {
    alert(`entry pushed! ${JSON.stringify(payload)}`)
}

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
                        const orderFrom = document.querySelector("form.order-window")

                        const qtyInput = document.querySelector(".order-window input[label='Qty.']")
                        const instrumentName = document.querySelector(".order-window span.tradingsymbol span.name").getInnerHTML()
                        const buySellSwitch = document.querySelector(".order-window input[stateoff='BUY']")


                        const headerArea = document.querySelector('.order-window .exchange-selector')
                        const newEl = document.createElement('div')
                        newEl.innerHTML = '<div><div style="display: flex; gap: 8px; trnsition: all 200ms ease;"><input type="checkbox" id="tjr-ow-addtotjr-chckbx" checked=true></input><p>Add to Trade Journal</p></div> <input id="tjr-ow-commentbox" style="background-color: #edf3ff;border: none;border-radius: 2px;height: 48px;width: 100%;color: #444;" multiline rows="3" multiline placeholder="type comment..." ></input></div>'
                        newEl.style = 'position: relative; z-index: 100;'


                        headerArea.appendChild(newEl)

                        const commentBox = document.querySelector('#tjr-ow-commentbox')

                        let isActive = true;

                        document.querySelector('#tjr-ow-addtotjr-chckbx').addEventListener('change', (e) => {
                            if (e.target.checked) {
                                commentBox.style.display = 'block'
                                isActive = true;
                            } else {
                                commentBox.style.display = 'none'
                                isActive = false;
                            }
                        })


                        qtyInput.addEventListener('change', (event) => {
                            console.log('Input value changed:', event.target.value);
                        });

                        orderFrom.addEventListener('submit', async (e) => {

                            if (!isActive) return;

                            const exchangeAndLTP = document.querySelector(".order-window .exchange.checked")
                            const orderType = document.querySelector(".order-window .variety .checked")?.textContent
                            const limitPrice = document.querySelector(".order-window input[label='Price']")

                            const payload = {
                                instrumentName: instrumentName,
                                qty: qtyInput.value,
                                buyOrSell: orderFrom.classList.contains('sell') ? 'SELL' : 'BUY',
                                time: new Date(),
                                comment: commentBox.value,
                                orderType: orderType,
                                exchange: exchangeAndLTP.textContent.substring(1, 4),
                                price: limitPrice?.value == 0 || limitPrice == null ? exchangeAndLTP.textContent.substring(6) : limitPrice.value,
                                ltp: exchangeAndLTP.textContent.substring(7)
                            }
                            pushTradeEntry(payload)
                        })
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
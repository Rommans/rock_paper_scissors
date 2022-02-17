$(document).ready(() => {
    function evil(fn) {
        return new Function('return ' + fn)();
    }

    function calculator() {
        let len = 0;
        let arr = [];
        let sum = 0;
        let inputVal = document.getElementById('calculator-screen');
        $('.calculator-keys .digit').on('click', function () {
            let num = $(this).attr('value');
            arr.push(num);
            $('#calculator-screen').html(arr);
            len = inputVal.innerHTML.split('');
        });

        $('.calculator-keys .operator').on('click', function (e) {
            e.preventDefault();
            let ops = $(this).attr('value');
            let lastEl = arr[arr.length - 1];
            if (/[+-/*]/.test(ops) && /[+-/*]$/.test(lastEl)) {
                arr.pop()
                arr.push(ops);
            } else {
                arr.push(ops);
            }
            $('#calculator-screen').html(arr);
            len = inputVal.innerHTML;
            if (/(?=(\D{2}))/g.test(arr)) {
                sum = len.substring(0, len.length - 1);
                $('#calculator-screen').html(arr);
            }
        });

        $('.equal-sign').on('click', () => {
            let lastEl = arr[arr.length - 1];
            let decimalNum = 3;
            if (lastEl === '=') {
                arr.pop()
            }
            try {
                let total = evil(sum);
                $('#calculator-screen').html(total % 1 !== 0 ? total.toFixed(decimalNum) : total);
                if (sum === undefined) {
                    $('#calculator-screen').html(0);
                }
                arr = [];
                let logContainer = document.querySelector('#log');
                let el = document.createElement('div');
                el.setAttribute('class', 'sum');
                if (len.charAt(0) === '=') {
                    let a = len.substring(1)
                    el.innerHTML = `
                    <span class="circle"></span>
                    <p class="item_log">${a}${total % 1 !== 0 ? total.toFixed(decimalNum) : total}</p>
                    <span class="cross">╳</span>
                `;
                } else {
                    el.innerHTML = `
                    <span class="circle"></span>
                    <p class="item_log">${len}${total % 1 !== 0 ? total.toFixed(decimalNum) : total}</p>
                    <span class="cross">╳</span>
                `;
                }
                logContainer.appendChild(el);

                let undtext = document.querySelectorAll('.item_log')
                undtext.forEach((el) => {
                    const regExp = /48/
                    if (regExp.test(el.innerText)) {
                        el.classList.add('underlined')
                    }
                })
            } catch (error) {
                $('#calculator-screen').html(0);
                sum = '';
                arr = [];
            }
        });

        $('.all-clear').click(() => {
            sum = '';
            arr = [];
            $('#calculator-screen').html(0);
            $('#calculator-screen').val(0);
        });

        $('#log').click((e) => {
            if ($(e.target).hasClass('circle')) {
                $(e.target).toggleClass('red');
            }
        });

        $('#log').click((e) => {
            if ($(e.target).hasClass('cross')) {
                $(e.target).closest('.sum').remove();
            }
        });

        $('#log').scroll(() => {
            console.log(`Scroll Top: ${$('#log').scrollTop()}`)
        });
    }
    calculator();
});
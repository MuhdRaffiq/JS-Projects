// set initialcount
let count = 0;

// select value andb button
const value = document.querySelector('#value');
const btns = document.querySelectorAll(".btn");

btns.forEach(function(btn) {
    //console.log(btn);
    btn.addEventListener('click', function(event){
        const styles = event.currentTarget.classList;
        //console.log(styles);
        if(styles.contains('decrease')){
            count--;
        } else if(styles.contains('increase')){
            count++;
        } else {
            count = 0;
        }
        if(count > 0) {
            value.style.color = "green";
        }
        if (count < 0) {
            value.style.color = "red";
        }
        if (count === 0) {
            value.style.color = "#222";
        }

        value.textContent = count;
    })
})

let level = 1;
let started = false;
let button_col = ["red", "blue", "green", "yellow"];
let gamepattern=[];
let userpattern=[];
function play(){
    userpattern=[];
    let random_col=randombutton();
    $("h1").text(`Level ${level}`)
    gamepattern.push(random_col);
    // flashbutton(random_col);
    
    for(let i=0;i<gamepattern.length;i++){
        setTimeout(()=>{
            flashbutton(gamepattern[i]);
            const audio=new Audio(gamepattern[i]+".mp3");
            audio.play();
        },500*(i+1))
        
    }

}

$(document).keydown(function () {
    if (!started) {
        started = true;
        $("h1").text(`Level ${level}`);
        play();
        
    }
});
function changetext() {
    $("h1").text("Press a button to Restart the game!");
}
function wrong_anm() {
    $("body").addClass("wrong");
    setTimeout(() => {
        $("body").removeClass("wrong");
    }, 300);
}

$(".btn").on("click", function () {
    if (!started) {
        const wrong = new Audio("wrong.mp3");
        wrong.play();
        wrong_anm();
        changetext();
        return;
    }

    // Animate button
    $(this).addClass("pressed");
    setTimeout(() => {
        $(this).removeClass("pressed");
    }, 300);

    // Play button sound
    const color = this.id;
    userpattern.push(color);
    checkanswer(userpattern.length-1);
    
    console.log(userpattern);
    
    const audio = new Audio(color + ".mp3");
    audio.play();
});
// Generate a random color each time 
function randombutton() { let n = Math.random(); n = n * 4; return button_col[Math.floor(n)]; }
// flash button
function flashbutton(color){
    const $btn = $("#" + color);
    $btn.addClass("pressed");
    setTimeout(() => {
        $btn.removeClass("pressed");
    }, 300);
}
// checking the answer
function checkanswer(index){
    if(userpattern[index]===gamepattern[index]){
        if(userpattern.length===gamepattern.length){
            level++;
            setTimeout(()=>{
                play();
            },1000)
        }

        
    }
    else{
        wrong_anm();
        const wrong = new Audio("wrong.mp3");
        wrong.play();
        changetext();
        started=false;
        level=1;
        gamepattern=[];
        userpattern=[];
    }
}


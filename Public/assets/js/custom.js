

document.getElementById('searchplayer').addEventListener('click',function(){
    console.log('/player/' + document.getElementById('searchplayervalue').value)
})

console.log($("#test"))
setInterval(function(){ console.log(document.getElementById('searchplayervalue').value); }, 3000);